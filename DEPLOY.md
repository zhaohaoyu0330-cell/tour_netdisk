# 北旅CLUB 网站部署指南

## Netlify 部署步骤

### 1. 注册 Netlify 账号
- 访问 [netlify.com](https://netlify.com)
- 点击 "Sign up" 注册账号
- 推荐使用 GitHub 账号登录（方便后续管理）

### 2. 部署网站
1. 登录 Netlify 后，点击 "New site from files"
2. 选择 "Deploy manually"
3. 将整个项目文件夹拖拽到 "Deploy manually" 区域
4. 等待部署完成（通常 1-2 分钟）

### 3. 获取测试链接
部署完成后，您会得到一个类似这样的链接：
`https://amazing-name-123456.netlify.app`

### 4. 配置自定义域名
1. 在站点仪表板中，点击 "Domain management"
2. 点击 "Add custom domain"
3. 输入：`whaleyouth.top`
4. 点击 "Verify"

### 5. DNS 配置
在您的域名服务商处添加以下 DNS 记录：

```
类型: CNAME
名称: www
值: your-site-name.netlify.app

类型: A
名称: @
值: 75.2.60.5
```

### 6. 启用 HTTPS
- Netlify 会自动为您的域名申请 SSL 证书
- 通常需要几分钟到几小时
- 在 "Domain management" 中可以查看证书状态

## 测试清单

- [ ] 网站正常加载
- [ ] 多语言切换功能正常
- [ ] 移动端显示正常
- [ ] 表单提交功能正常
- [ ] 所有图片正常显示
- [ ] 导航菜单工作正常
- [ ] HTTPS 证书生效
- [ ] 自定义域名正常工作

## 故障排除

### 常见问题
1. **DNS 传播慢**：通常需要 24-48 小时
2. **SSL 证书未生效**：等待几分钟到几小时
3. **图片不显示**：检查图片链接是否正确
4. **表单不工作**：这是正常的，需要后端支持

### 联系支持
如果遇到问题，可以：
1. 查看 Netlify 文档
2. 联系 Netlify 支持
3. 检查浏览器控制台错误信息

## 后续优化

1. **性能优化**：启用 Netlify 的 CDN 加速
2. **表单处理**：集成 Netlify Forms 或第三方服务
3. **分析工具**：添加 Google Analytics
4. **SEO 优化**：添加 meta 标签和结构化数据
