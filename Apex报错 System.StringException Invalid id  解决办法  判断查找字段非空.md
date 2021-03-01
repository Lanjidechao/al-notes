# Apex报错 System.StringException: Invalid id:  解决办法 / 判断查找字段非空

## 发生场景：

检查自定义对象某个查找字段是否为空的时候报错，错误代码示例：

```java
List<Custom__c> recordList = [SELECT Id, Name, Lookup__c FROM Custom__c WHERE Id in :idList];
for (Integer i = 0; i < recordList.size(); i++) {
	if (recordList[i].Lookup__c == null || recordList[i].Lookup__c == '') {
        // do something
    }
}
```

上述代码会报错：```System.StringException: Invalid id:  ``` 

## 发生原因

虽然在Apex中，Id是继承了String的类型，但是将查找字段直接和```''``` 比较还是会报错，比较奇怪的是，如果上述代码改成```recordList[0].Lookup__c == null || recordList[0].Lookup__c == ''``` 就不会报错了。这个原因我没有深究，总之表现非常奇怪。

## 解决方法

如果我们要判断查找字段是否为空，实际上是不需要用 ```''``` 进行判断的，只需要判断它是不是 ```null``` 就可以了。上述代码中的判断条件可改为下述两种：

- ```java
  if (recordList[i].Lookup__c == null) {}
  ```

- ```java
  if (String.isBlank(recordList[i].Lookup__c)) {}
  ```

这里推荐第一种，下面用```isBlank``` 的方法整体会比上面直接判断 ```null``` 慢两倍左右。

