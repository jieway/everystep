#  

这一节主要研究基于代价的优化器。

根据代价模型估计多个计划的好坏从而选择一个最好的执行计划。

![20220318190726](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318190726.png)

谓词的选择性近似为概率：

![20220318191822](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318191822.png)

基于概率的思想来处理交集和全集：

![20220318191935](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318191935.png)

# Join 结果集评估

![20220318192841](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318192841.png)

此前是基于整个字段均匀分布，但是存在不独立的情况。

修改为桶内(区域字段)均匀分布，桶间不均匀。

采样，取子集分析子集推全集。

左深树，Join 的左子树也是 Join 生产的中间表，右子树必须是表。

![20220318194511](https://cdn.jsdelivr.net/gh/weijiew/pic/images/20220318194511.png)

