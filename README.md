#MouseTrace#

###简介###
这是一个基于鼠标轨迹分析的验证码。在对鼠标轨迹进行初步判断（如移动速度、方向等）后，再根据算法判断其可信度。

###算法###
我们假设轨迹具有马尔科夫性质，相异度的计算采用混合高斯模型，可信度的计算采用单高斯模型。因此需要分别添加“可信任轨迹”和“可信任的待测轨迹”两个列表，将可信任的待测轨迹与可信任轨迹分别对比测得最大相异度，并计算其均值。

###环境###
- Node.js 4.2+
- Redis 3.0+

###使用###
1.  添加可信任的轨迹
    POST example.com/model/add traces
其中，traces 为 Json 格式的数组，数组内只需要有轨迹的名称，如：
    {"set": [trace:0, trace:1, trace:2]}
2.  添加可信任的待测轨迹
    POST example.com/model/add/test traces
3.  建立模型
    GET example.com/model/construct