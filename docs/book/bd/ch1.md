# 数据仓库

## 架构

大数据部门的组织架构：

![](https://gitee.com/weijiew/pic/raw/master/img/20201128232049.png)

项目组成：

![](https://gitee.com/weijiew/pic/raw/master/img/20201128232250.png)

## 概念

数据仓库：为决策提供数据支撑。实现了数据的备份，清洗，聚合，统计功能，为数据的最终目的做好准备。

* 业务数据：登陆，支付，下单等数据信息，一般存储在 Mysql，Oracle 中。采用 Sqoop 来存入数据仓库中。
* 用户行为数据：与客户端交互的数据。例如：浏览，收藏等操作。某种程度上可以体现用户的心理。日志，文件格式存储。采用 Flume 来存入数据仓库中。
* 爬虫数据：容易产生法律问题！

![](https://gitee.com/weijiew/pic/raw/master/img/20201128233233.png)

# 需求分析

## 项目需求

1. 行为数据采集平台搭建。
2. 业务数据采集平台搭建。
3. 数据仓库维度建模。
4. 指标统计，例如：用户，流量，销售等指标。
5. 即席查询工具，随时都能分析指标。
6. 集群性能监控，发生异常时可以报警。
7. 元数据监控，用于判定哪个任务出现问题，修正。
8. 质量监控，监控数据是否超过合理范围等一些数据问题，实现数据监控。

## 技术选型

1. 数据量大小：
   1. 小：myslq 。
   2. 大：Hadoop 的 HDFS 中。
2. 业务需要求：
   1. 业务数据存于 Mysql 中采用 Sqoop 来存入数仓中。
   2. 日志数据存于日志文件中，采用 Flume 来存入数仓中。
3. 业内经验：
   1. 大厂使用。
4. 技术成熟：
   1. 版本稳定。
5. 技术成熟度。
6. 开发维护成本。
7. 总成本预算。

* 数据采集传输： Flume,Kafka,Sqoop,Logstash,DataX.
* 数据存储：Mysql,HDFS,Hbase,Redis,MongoDB.
* 数据计算：Hive,Tez,Spark,Flink,Storm.
* 数据查询：Presto,Druid,Impala,Kyling.
* 数据可视化：Echarts,Superset,QuickBI,DataX.
* 任务调度：Azkaban,Oozie.
* 集群监控：Zabbix.
* 元数据管理：Atlas.
* 数据质量监控：Griffin,Shell,Python.
