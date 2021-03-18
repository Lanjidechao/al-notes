# soql中检索不到某些自定义字段的解决方法

有时候我们在对象中创建了一些自定义字段，但是在 console 中就是检索不出来，并且报错 `No such column 'customm_fields__c' on entity 'custom_object__c'. If you are attempting to use a custom field, be sure to append the '__c' after the custom field name. Please reference your WSDL or the describe call for the appropriate names.` 但是在后台明明是有这个字段的。

放心，这不是什么框架上的Bug，而是权限设置的问题。

## 解决方法

进入简档的设置子页面：

- 设置主页
  - 管理 - 用户
    - 简档

找到你当前使用的简档（通常为系统管理员），在应用程序栏，找到 **对象设置** 点击进入

在对象列表中找到你正在查询的对象，点击进入。

在字段权限列表中，找到刚才报错的字段，通常你会看到它的**读取访问权限**和**编辑访问权限**是没有勾选上的。

如果没有勾选上，则确定是这个原因，编辑当前页面，将查询不到的字段的这两个权限勾选上后保存。

保存完成后，再尝试执行刚才的查询语句，发现一切正常了。

