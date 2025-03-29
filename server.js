const express = require('express');
const cors = require('cors');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const https = require('https');
const forge = require('node-forge');
const WebSocket = require('ws');

const app = express();
app.use(cors());
app.use(express.json());

// 创建WebSocket服务器
const wss = new WebSocket.Server({ port: 3002 });

// 存储所有连接的客户端
const clients = new Set();

// WebSocket连接处理
wss.on('connection', (ws) => {
    console.log('新的WebSocket客户端连接');
    clients.add(ws);
    
    ws.on('close', () => {
        console.log('WebSocket客户端断开连接');
        clients.delete(ws);
    });
});

// 广播消息给所有连接的客户端
function broadcastMessage(message) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

// 确保data目录存在
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// 确保证书目录存在
const certsDir = path.join(__dirname, 'certs');
if (!fs.existsSync(certsDir)) {
    fs.mkdirSync(certsDir);
}

// 生成自签名证书
const generateSelfSignedCert = () => {
    const certPath = path.join(certsDir, 'cert.pem');
    const keyPath = path.join(certsDir, 'key.pem');
    
    if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
        // 生成密钥对
        const keys = forge.pki.rsa.generateKeyPair(4096);
        
        // 创建证书
        const cert = forge.pki.createCertificate();
        cert.publicKey = keys.publicKey;
        cert.serialNumber = '01';
        
        // 设置证书有效期
        const now = new Date();
        cert.validity.notBefore = now;
        cert.validity.notAfter = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000); // 1年有效期
        
        // 设置证书信息
        const attrs = [{
            name: 'commonName',
            value: 'localhost'
        }, {
            name: 'organizationName',
            value: 'Webhook Server'
        }];
        
        cert.setSubject(attrs);
        cert.setIssuer(attrs);
        
        // 使用私钥签名证书
        cert.sign(keys.privateKey);
        
        // 保存证书和私钥
        fs.writeFileSync(certPath, forge.pki.certificateToPem(cert));
        fs.writeFileSync(keyPath, forge.pki.privateKeyToPem(keys.privateKey));
    }
    
    return {
        cert: fs.readFileSync(certPath),
        key: fs.readFileSync(keyPath)
    };
};

// 确保Excel文件存在
const excelPath = path.join(dataDir, 'messages.xlsx');
if (!fs.existsSync(excelPath)) {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
        ['时间', '消息内容']
    ]);
    XLSX.utils.book_append_sheet(workbook, worksheet, '消息记录');
    XLSX.writeFile(workbook, excelPath);
}

// 监听webhook请求
app.post('/webhook', async (req, res) => {
    try {
        const { text } = req.body;
        console.log('\n=== 收到新webhook消息 ===');
        console.log('消息内容:', text);
        console.log('时间:', new Date().toLocaleString());
        console.log('=====================\n');

        // 确保data目录存在
        if (!fs.existsSync('data')) {
            fs.mkdirSync('data');
        }

        const excelPath = path.join(__dirname, 'data', 'messages.xlsx');
        let workbook;
        let worksheet;

        // 检查Excel文件是否存在
        if (fs.existsSync(excelPath)) {
            // 如果文件存在，读取它
            const buffer = fs.readFileSync(excelPath);
            workbook = XLSX.read(buffer, { type: 'buffer' });
            
            // 检查工作表是否存在
            if (workbook.SheetNames.includes('消息记录')) {
                worksheet = workbook.Sheets['消息记录'];
            } else {
                // 如果工作表不存在，创建新的
                worksheet = XLSX.utils.aoa_to_sheet([['时间', '消息内容']]);
                XLSX.utils.book_append_sheet(workbook, worksheet, '消息记录');
            }
        } else {
            // 如果文件不存在，创建新的
            workbook = XLSX.utils.book_new();
            worksheet = XLSX.utils.aoa_to_sheet([['时间', '消息内容']]);
            XLSX.utils.book_append_sheet(workbook, worksheet, '消息记录');
        }

        // 添加新消息
        const newRow = [new Date().toLocaleString(), text];
        XLSX.utils.sheet_add_aoa(worksheet, [newRow], { origin: -1 });

        // 保存文件
        XLSX.writeFile(workbook, excelPath);
        console.log('消息已保存到Excel文件');

        // 广播新消息给所有连接的客户端
        broadcastMessage({ text: text });
        console.log('已广播新消息给所有客户端');

        // 返回最新消息
        const data = XLSX.utils.sheet_to_json(worksheet);
        const lastMessage = data[data.length - 1]['消息内容'];
        console.log('返回最新消息:', lastMessage);
        res.json({ success: true, message: '消息已保存', text: lastMessage });
    } catch (error) {
        console.error('处理webhook请求失败:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// 获取最新消息
app.get('/webhook', async (req, res) => {
    try {
        console.log('\n=== 收到获取最新消息请求 ===');
        console.log('时间:', new Date().toLocaleString());
        
        const excelPath = path.join(__dirname, 'data', 'messages.xlsx');
        
        // 检查Excel文件是否存在
        if (!fs.existsSync(excelPath)) {
            console.log('Excel文件不存在');
            console.log('=====================\n');
            return res.json({ text: '暂无消息' });
        }

        // 读取Excel文件
        console.log('正在读取Excel文件...');
        const workbook = XLSX.readFile(excelPath);
        const worksheet = workbook.Sheets['消息记录'];
        const data = XLSX.utils.sheet_to_json(worksheet);
        
        if (data.length > 0) {
            const lastMessage = data[data.length - 1]['消息内容'];
            console.log('获取到最新消息:', lastMessage);
            console.log('=====================\n');
            res.json({ text: lastMessage });
        } else {
            console.log('Excel文件中没有消息数据');
            console.log('=====================\n');
            res.json({ text: '暂无消息' });
        }
    } catch (error) {
        console.error('获取最新消息失败:', error);
        console.log('=====================\n');
        res.status(500).json({ error: '获取消息失败' });
    }
});

// 从Excel文件获取最新消息
app.get('/excel-message', async (req, res) => {
  try {
    console.log('\n=== 收到获取Excel消息请求 ===');
    console.log('时间:', new Date().toLocaleString());
    
    const excelPath = path.join(__dirname, 'data', 'messages.xlsx');
    
    // 检查Excel文件是否存在
    if (!fs.existsSync(excelPath)) {
      console.log('Excel文件不存在');
      console.log('=====================\n');
      return res.json({ text: '暂无消息' });
    }

    // 读取Excel文件
    console.log('正在读取Excel文件...');
    const workbook = XLSX.readFile(excelPath);
    const worksheet = workbook.Sheets['消息记录'];
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    if (data.length > 0) {
      const lastMessage = data[data.length - 1]['消息内容'];
      console.log('获取到最新消息:', lastMessage);
      console.log('=====================\n');
      res.json({ text: lastMessage });
    } else {
      console.log('Excel文件中没有消息数据');
      console.log('=====================\n');
      res.json({ text: '暂无消息' });
    }
  } catch (error) {
    console.error('读取Excel文件失败:', error);
    console.log('=====================\n');
    res.status(500).json({ error: '获取消息失败' });
  }
});

// 启动HTTP和HTTPS服务器
const PORT = 3002;
const certs = generateSelfSignedCert();
const httpsServer = https.createServer(certs, app);
const httpServer = require('http').createServer(app);

// 启动HTTP服务器
httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`HTTP服务器运行在 http://localhost:${PORT}`);
    console.log(`HTTP服务器运行在 http://111.220.135.254:${PORT}`);
});

// 启动HTTPS服务器
httpsServer.listen(PORT + 1, '0.0.0.0', () => {
    console.log(`HTTPS Webhook服务器运行在 https://localhost:${PORT + 1}/webhook`);
    console.log(`外网访问地址: https://111.220.135.254:${PORT + 1}/webhook`);
    console.log('注意：由于使用自签名证书，首次访问时浏览器会显示安全警告，这是正常的。');
}); 