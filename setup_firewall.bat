@echo off
echo 正在配置防火墙规则...

:: 删除可能存在的旧规则
netsh advfirewall firewall delete rule name="Webhook HTTPS Server"

:: 添加入站规则
netsh advfirewall firewall add rule ^
    name="Webhook HTTPS Server" ^
    dir=in ^
    action=allow ^
    protocol=TCP ^
    localport=3002 ^
    description="允许HTTPS Webhook服务器访问"

:: 添加出站规则
netsh advfirewall firewall add rule ^
    name="Webhook HTTPS Server Out" ^
    dir=out ^
    action=allow ^
    protocol=TCP ^
    localport=3002 ^
    description="允许HTTPS Webhook服务器出站"

echo 防火墙规则配置完成！
echo 请按任意键退出...
pause > nul