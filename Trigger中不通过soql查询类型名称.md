#### Trigger中不通过soql查询类型名称

##### 应用场景

在Trigger中，我们有时候会需要判断当前记录的记录类型。在Trigger的上下文中，记录有关类型的数据只有一个 *RecordTypeId* ，而在开发规约中，通常并不允许通过RecordTypeId来判断类型，原因大概有：

1. RecordTypeId会随着环境（Sandbox, Production ...) 改变
2. 用RecordTypeId判断属于硬编码（hardcode）

因此，在项目开发中会用定义RecordTypeInfo的DeveloperName来判断类型。但是与之而来的问题是，如果通过Soql的方式，用RecordTypeId取DeveloperName，会在for循环内触发上限限制：

```java
For (Record__c r : Trigger.New) {
    String developerName = [Select Id, Name, DeveloperName from RecordType WHERE Id = :r.RecordTypeId];
    // actions...
}
```

因此，我们可以用替代方法： **describe call**

##### Describe Call

###### Schema

首先简单介绍一下 ***Schema*** ，它是Apex提供的架构命名空间，里面提供了一系列的元数据类，包括但不限于：

- 子关系
- 对象
- 对象字段
- 选项卡
- 字段集合
- 选项列表
- **记录类型**
- ...

这次我们就需要利用到 *Schema.RecordTypeInfo* 类。

###### RecordTypeInfo

这个类中含有各种访问架构中记录类型的方法。

**如何创建一个RecordTypeInfo的Map对象**

```java
Schema.DescribeSObjectResult R = Account.SObjectType.getDescribe();
List<Schema.RecordTypeInfo> RT = R.getRecordTypeInfos();
```

**通过RecordTypeId从Map对象中获取各种信息**

```java
Schema.RecordTypeInfo rtById =  rtMapById.get(RecordTypeId);
String DeveloperName = rtById.getDeveloperName();
String Name = rtById.getName();
Boolean isActive = rtById.isActive();
Boolean isAvailable = rtById.isAvilable();
// etc.
```

**案例**

回到我们在Trigger中的应用场景，在For循环内，我们可以如下加以判断：

```java
Id recordTypeId = to.recordTypeId;
String developerName = '';
Map<Id, RecordTypeInfo> orderinfos = Schema.SObjectType.Record__c.getRecordTypeInfosById();
if (orderinfos.containsKey(recordTypeId)) {
    developerName = orderinfos.get(recordTypeId).getDeveloperName();
}
// ... more actions
```

#### 扩展阅读

- [Schema命名空间](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_namespace_Schema.htm)
- [RecordTypeInfo类](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_class_Schema_RecordTypeInfo.htm#apex_class_Schema_RecordTypeInfo)