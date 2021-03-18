# Salesforce 使用自定义通知功能

[TOC]

在Salesforce中，页面的右上角的小铃铛是平台上的通知功能，它类似于一个消息推送，当有什么事件发生的时候会推送到指定用户上，这样用户在使用的时候能够第一时间关注到事件。

Salesforce也提供了自定义通知的功能，利用Interface GUI + Apex少量代码，我们可以定制化一个自定义通知，从而做到平台级别的推送消息。

## 平台设置

首先进入设置页面，左侧的快速查找框内输入 **自定义通知** ，点击进入子页面。

点击右侧 **新建** 按钮，在弹出框中输入自定义通知名称和API名称，API名称后续我们会在 Apex 类中使用。

支持的渠道选择桌面和移动，Salesforce的两端兼容实现得还是很好的，点击保存。

## Apex类

新建一个Apex类，作为我们发送通知的工作类。自定义通知类为 `Messaging.CustomNotification` 。

### Messaging.CustomNotification

#### 属性

| 属性名        | 类型   | 含义           |
| ------------- | ------ | -------------- |
| typeId        | String | 自定义通知的Id |
| sender        | String | 发送者Id       |
| title         | String | 标题           |
| body          | String | 正文           |
| targetId      | String | 目标记录的Id   |
| targetPageRef | String | 非记录页面索引 |

#### 方法

- `send(user)`
- `setNotificationTypeId(id)`
- `setTitle(title)`
- `setBody(body)`
- `setSenderId(id)`
- `setTargetId(id)`
- `setTargetPageRef(pageRef)`

基本上都是属性的 `setter` 方法。

### 代码示例

```java
public without sharing class CustomNotificationFromApex {
 
    public static void notifyUsers(Set<String> recipientsIds, String targetId) {
 
        // 取得自定义通知的Id
        CustomNotificationType notificationType = 
            [SELECT Id, DeveloperName 
             FROM CustomNotificationType 
             WHERE DeveloperName='Custom_Notification'];
        
        // 新建一个自定义通知对象
        Messaging.CustomNotification notification = new Messaging.CustomNotification();
 
        // 设置标题、正文
        notification.setTitle('Apex Custom Notification');
        notification.setBody('The notifications are coming from INSIDE the Apex!');
 
        // 设置类型和目标记录Id
        notification.setNotificationTypeId(notificationType.Id);
        notification.setTargetId(targetId);
        
        // 发送通知
        try {
            notification.send(recipientsIds);
        }
        catch (Exception e) {
            System.debug('Problem sending notification: ' + e.getMessage());
        }
    }
}
```

## 参考链接

更加完成的使用文档请参考[官方文档](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_class_Messaging_CustomNotification.htm)