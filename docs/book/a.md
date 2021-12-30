# Comparison of Numerical Calculation Methods for Stem Diameter Retrieval Using Terrestrial Laser Data

使用激光扫描的茎部直径检索的数值计算方法的比较

# Abstract: 

摘要

Terrestrial laser scanning (TLS) can be used as a millimeter-level measurement tool for forest inventories. 

TLS 可以被作为毫米级的测量用于检测森林资源。

However, the stem diameter retrieval accuracy in sample plot scanning is not yet convincing. 

然而，茎秆直径检索样本的精度依旧无法令人信服。

The errors in each step of stem diameter retrieval algorithms must be evaluated. 

茎秆检索算法每一步的误差都必须进行评估。

In this study, six numerical calculation methods for the numerical calculation step, i.e., cylinder fitting (CYF), circle fitting (CF), convex hull line fitting (CLF), the proposed caliper simulation method (CSM), closure B-spline curve fitting (SP) and closure Bézier curve fitting with global convexity (SPC), were applied to stem diameter retrieval, and the similarities and differences were evaluated. 

在这个研究中，六种数值计算方法的数值计算步骤，例如圆柱拟合（cylinder fitting (CYF)），圆形拟合（circle fitting (CF)），凸起线拟合（convex hull line fitting (CLF)），卡尺拟合（caliper simulation method (CSM)），封闭贝塞尔曲线拟合（closure B-spline curve fitting (SP)），具有全局凸性的封闭贝塞尔曲线拟合（closure Bézier curve fitting with global convexity (SPC)）被应用于茎秆直径检索中，并对其相似性和差异性进行了评估。

The ovality, completeness and roughness were used to evaluate the stem slice point cloud quality. 

椭圆度，完整度和粗糙程度被用于评估茎部切片点云的质量。

A total of 165 stem slice point clouds at breast height collected from three Larix kaempferi plots were used.

总共使用了 165 个胸部高度的茎秆点云切片，这些数据来自三个 Larix kaempferi 地块的数据。

Compared with the field-measured stem diameters at breast height (DBHs), the root mean square errors (RMSEs) of the CYF, CF, CLF, CSM, SP and SPC methods were 0.30 cm, 0.30 cm, 0.51 cm, 0.51 cm, 0.56 cm and 0.54 cm, respectively. 

和实际测量的茎秆胸部直径相比，CYF、CF、CLF、CSM、SP和SPC方法的均方根误差（RMSE）分别为0.30厘米、0.30厘米、0.51厘米、0.51厘米、0.56厘米和0.54厘米。

Compared with the SPC method results, the RMSE of the CSM results was 0.05 cm. 

和 SPC 方法结果相比， CSM 的 RMSE 结果是 0.05 cm。

The results illustrated that the CYF and CF methods performed the same, as did the CLF and CSM methods. 

CYF 和 CF 方法展现的结果有相同的表现，CLF 和 CSM 也是。

Most DBHs retrieved by the CYF and CF methods were smaller than the field-measured DBHs, and most DBHs retrieved by the CLF, CSM, SP and SPC methods were larger than the field-measured DBHs. 

大多数通过 CYF 和 CF 方法所检索的 DBHs 要小于实际测量的 DBHs，并且大多数由 CLF，CSM，SP 和 SPC 方法所检测出来的 DBHs 大于实际测量的 DBHs。

This study demonstrated that the CYF and CF methods perform the best and are the most robust, and the measurements by a diameter tape and a caliper are similar enough for forestry inventories. 

这个研究现实了 CYF 和 CF 方法表现很好并且很健壮，并且由直径尺和卡尺进行测量在林业清查中是足够相似的。

Evaluating and preprocessing stem slice point clouds is a potential way to improve stem diameter retrieval accuracy

评估和预处理茎秆切片点云是一个提神茎秆检索精度的潜在方式。

# 1. Introduction 绪论

Terrestrial laser scanning (TLS) has emerged as an accurate means for nondestructively
deriving three-dimensional (3D) forest structural attributes [1]. 

激光扫描（TLS）作为一个精确并且无损得出森林的 3D 结构属性的方式。

TLS has the capacity to obtain the 3D geometrical structure of a tree at the millimeter level, which is beyond the ability of traditional measurement tools [2]. 

TLS 由能力去获得一个树毫米级的 3D 图形结构，这已经超越了传统测量工具的能力。

After two decades of research, the tree attributes that can be automatically retrieved from TLS data include not only widely used forest inventories, such as tree location [3–5], stem diameter [6–10], stem height [9,11], stem crown width [9], but also those that cannot be directly measured using conventional tools, such as stem curve [12,13], stem volume [14,15] and other forestry parameters. 

经过 20 年的研究，可以从 TLS 数据中自动树的属性检索不仅仅包含广泛使用的森林清单，例如树的位置，茎秆直径，茎秆高度，茎冠宽度，还包含那些不能使用传统工具所直接测量的，例如颈部曲线，茎量和其他林业参数。

However, TLS has not yet been considered an operational tool in forest inventories. 

然而，TLS 依旧无法被认为是森林资源中的操作工具。

In addition to the cost, there is another factor that is the difficulties in constructing automatic stem parameter retrieval methods that provide convincing measurement results [16].

除了成本之外，还有一个因素，那就是难以构建自动茎部参数检索方法并提供令人信服的测量结果[16]。

Stem diameter is one of the most important parameters in forest inventories, as some important stem metrics, such as stem taper construction and merchantable stem volume [17], are calculated based on this parameter. 

茎干直径是森林资源清查中最重要的参数之一，因为一些重要的茎干指标，如茎干锥度结构和可销售的茎干体积[17]，都是根据这个参数计算的。

Therefore, accurate retrieval of the stem diameter has become one of the important studies for forest inventories using TLS data.

因此，准确检索茎干直径已成为使用TLS数据进行森林调查的重要研究之一。

There are many steps in a stem diameter retrieval algorithm, such as stem cross-section determination [8,18], stem point selection [3,19], outliers removal [20,21] and numerical computation [7]. 

茎部直径检索算法有许多步骤，如茎部横截面的确定[8,18]，茎点选择[3,19]，去除离群值[20,21]和数值计算[7]。

The accuracy of retrieved stem diameter at breast height (DBH) using the circle fitting (CF) method is effected by the stem cross-section thickness, where the values obtained in the range of 1–10 cm are not significantly different and those obtained in the range of 10–100 cm are significantly different [19]. 

使用圆周拟合（CF）方法检索茎的胸高直径（DBH）的准确性受到茎的横截面厚度的影响，在1-10厘米范围内获得的数值没有显著差异，在10-100厘米范围内获得的数值有显著差异[19]。

In practice, it is unrealistic to evaluate the errors introduced in all the steps of all stem diameter retrieval algorithms.

在实践中，评估所有干径检索算法的所有步骤中引入的误差是不现实的。

However, all stem diameter retrieval algorithms can be divided into two major steps. 

然而，所有的茎直径检索算法都可以分为两个主要步骤。

The first is stem point preprocessing, which focuses on data collection and preprocessing, such as point cloud registration, ground point removal, stem location, stem cross-section determination and stem point selection. 

首先是茎点预处理，主要是数据采集和预处理，如点云注册、地面点去除、茎点定位、茎点截面确定和茎点选择。

The next step is numerical calculation for stem diameter retrieval, which focuses on numerical computational methods, such as CF and cylinder fitting (CYF). 

下一步是茎部直径检索的数值计算，重点是数值计算方法，如CF和圆柱体拟合（CYF）。

The aims of the two steps are to provide stem points with high quality and to retrieve stem diameters with high precision. 

这两个步骤的目的是提供高质量的茎点，并以高精确度检索茎的直径。

A satisfactory stem diameter is retrieved when both these aims are achieved. 

当这两个目标都达到时，就可以获得满意的茎部直径。

As a matter of fact, some studies have divided the stem diameter retrieval algorithm into two steps similar to the above. 

事实上，一些研究将茎径检索算法分为与上述类似的两个步骤。

Such as, the first step is outliers removal [20,21] or stem point selection [7,8,18,19], and the next step is numerical calculation. 

如，第一步是去除异常值[20,21]或茎秆点选择[7,8,18,19]，接下来是数值计算。

However, the aims of the two steps are mixed together rather than clearly defined separately.

然而，这两个步骤的目标是混合在一起的，而不是分别明确界定的。

Many stem diameter retrieval numerical methods have been introduced and applied with different tree species and environmental factors during the past two decades. 

在过去的20年中，许多干径检索的数值方法被引入并应用于不同的树种和环境因素。

In summary, these methods can be roughly divided into two types. 

总之，这些方法可以大致分为两种类型。

(1) The first type is classic regular approaches. 

(1) 第一种类型是经典的常规方法。

The stem is simplified into a regular geometry, in which the stem cross-section is assumed to be a circular geometry. 

茎被简化为一个规则的几何形状，其中茎的横截面被假定为一个圆形几何形状。

Therefore, the stem diameter is retrieved using CYF [9], CF [3], Hough transform [22] and variant methods [13,23]. 

因此，使用CYF[9]、CF[3]、Hough变换[22]和变体方法[13,23]来检索茎部直径。

These methods are easy to apply and can also output satisfactory results when the stem point density is insufficient, especially for single-scan data. 

这些方法很容易应用，而且在茎点密度不足时也能输出令人满意的结果，特别是对于单次扫描数据。

However, these methods overlook the irregularity in the stem cross-section that can be derived from TLS data and may not always correspond to reality [7]. 

然而，这些方法忽略了可以从TLS数据中得出的茎部横截面的不规则性，可能并不总是与现实相符[7]。

(2) The second type is simulated manual measurement approaches. 

(2) 第二类是模拟人工测量方法。

The irregularity in the stem cross-section and the working scenario of the field work, i.e., the path of the diameter tape that is passed through the convex part of the stem cross-section, are considered in stem diameter retrieval. 

在茎部直径检索中，要考虑到茎部横截面的不规则性和现场工作情况，即直径带通过茎部横截面的凸起部分的路径。

From this, the stem diameter is retrieved by simulating the path of the diameter tape using convex hull line fitting (CLF) [21,24], closure B-spline curve fitting (SP) [8] and closure Bézier curve fitting with global convexity (SPC) [18]. 

由此，通过使用凸壳线拟合（CLF）[21,24]、闭合B-spline曲线拟合（SP）[8]和具有全局凸性的闭合贝塞尔曲线拟合（SPC）[18]模拟直径带的路径来检索茎的直径。

These methods consider irregularity of the stems, however, they are time-consuming and require high point densities. 

这些方法考虑了茎的不规则性，然而，它们很耗时，而且需要高的点密度。

However, in different studies, the above methods have yielded satisfactory results with the respective study materials.

然而，在不同的研究中，上述方法在各自的研究材料中都取得了满意的结果。

It is difficult to directly compare the performances of these methods between different studies as the inputs are different [7,12]. 

由于输入不同，很难直接比较这些方法在不同研究中的表现[7,12]。

This raises the question of how to choose a stem diameter retrieval numerical method, or how to retrieve stem diameter with high accuracy for a given stem point cloud.

这就提出了一个问题，即如何选择一个茎部直径检索的数字方法，或者如何对一个给定的茎部点云进行高精度的茎部直径检索。

In addition to the stem diameter tape, the caliper is a common measuring tool for stem diameter in the field work. 

除了茎部直径尺外，卡尺也是田间工作中常用的茎部直径测量工具。

The caliper is used to measure stem diameters in several directions, and the average of all the directional diameters is the measured stem diameter.

卡尺用于测量几个方向的茎部直径，所有方向直径的平均值就是测量的茎部直径。

Van Laar and Akca listed the detailed quality specifications for caliper operation [25]. 

Van Laar和Akca列出了卡尺操作的详细质量规范[25]。

The stem diameter measured with the diameter tape was slightly larger than that measured with the caliper in practice [26]. 

在实践中，用直径带测量的茎部直径比用卡尺测量的直径略大[26]。

Tang theoretically proved that the average stem diameter measured in all directions with the caliper is equal to that measured using stem diameter tape whether the shape of the stem cross-section is convex or concave [27]. 

Tang从理论上证明，无论茎部横截面的形状是凸还是凹，用卡尺在各个方向测量的平均茎部直径都等于用茎部直径尺测量的直径[27]。

At present, TLS can capture the geometrical characteristics of the stem cross-section; thus, it is possible to evaluate the equivalency between the stem diameter tape and the caliper using TLS data by simulation measurements.

目前，TLS可以捕捉到茎部横截面的几何特征；因此，有可能通过模拟测量，利用TLS数据评估茎部直径带和卡尺之间的等效性。

In this study, we consider the similarities and differences between several stem diameter numerical calculation methods without regard to the stem point preprocessing step.

在这项研究中，我们考虑了几种干径数值计算方法的异同，而不考虑干点预处理步骤。

The specific objectives are (1) to practically and theoretically evaluate the performances of different stem diameter retrieval numerical methods, (2) to evaluate the equivalency between the diameter tape and the caliper, and (3) to discuss potential ways to improve the accuracy of stem parameter retrieval.

具体目标是：（1）从实践和理论上评估不同的茎干直径检索数字方法的性能，（2）评估直径带和卡尺之间的等效性，以及（3）讨论提高茎干参数检索精度的潜在方法。

# 2. Materials and Methods

## 2.1. Study Site and Field Data Collection 研究地点和实地数据收集

The scanning sample and field-measured stem diameters were obtained in July 2018 in Dagujia Forest Farm (N 42°210 , E 124°520) in Qingyuan County, Liaoning Province, China.

2018年7月，在中国辽宁省清原县大顾家林场（N 42°210 , E 124°520）获得扫描样本和现场测量的茎部直径。

The study materials were sourced from three Larix kaempferi plantation plots. The area of each plot was 30 m × 30 m, and the ages of the plots were 25, 36 and 36 years in 2018.

研究材料来自三个Larix kaempferi种植园的地块。每个地块的面积为30米×30米，地块的年龄在 2018 年为 25、36 和 36 岁。

In the field work, the DBH was manually measured using stainless steel diameter tape according to a measuring position, which was labelled using white paint after peeling the bark in 2017 (Figure 1). 

在野外工作中，根据测量位置，使用不锈钢直径带手动测量DBH，在2017年剥去树皮后，使用白色油漆进行标记（图1）。

The maximum, minimum and average values of the field-measured stem diameters were 34.8 cm, 11.7 cm and 19.2 cm, respectively.

现场测量的最大、最小和平均值的茎直径分别为34.8厘米、11.7厘米和19.2厘米。

Trees were scanned from nine TLS stations (the center position of the stand, and the four corners and center positions of each border). 

树木从九个TLS站（树群的中心位置，以及每个边界的四个角和中心位置）进行扫描。

The scanner device was a FARO Focus3D X 330 [28]. The scan quality was 4× (a scanning parameter of the FARO TLS scanner), the scan speed was 122 kpts/s, the point spacing was 6.136 mm at 10 m, and reference spheres were used for registration. 

扫描仪设备是FARO Focus3D X 330[28]。扫描质量为4倍（FARO TLS扫描仪的扫描参数），扫描速度为122 kpts/s，10米处的点间距为6.136 mm，并使用参考球进行登记。

Point cloud registration was performed using the FARO Scene 5.0 software, and the average of mean tension of each registration (the lower the tension value, the better the registration result) for three plots were 0.00261, 0.01036 and 0.00574, respectively. 

使用FARO Scene 5.0软件进行点云登记，三幅地块每次登记的平均张力（张力值越低，登记结果越好）分别为0.00261、0.01036和0.00574。

After that, the single tree points were extracted according to the continuity of the stem in the vertical direction [29]. 

之后，根据树干在垂直方向上的连续性，提取单棵树的点[29]。

There were 65, 50 and 50 single trees extracted from the three plots.

从三个地块中分别提取了65、50和50棵单株树。

## 2.2. TLS Data Preprocessing

A set of data processing procedures was used to obtain the experimental data. 

一套数据处理程序被用来获得实验数据。

For a tree point cloud, the outliers, for which the number of neighbor points in a radius of 1 cm was less than 2, were removed. After that, the 3D stem axis curve [18] represented by a cubic B-spline curve at a height range of 20 cm to 300 cm was constructed. 

对于一棵树的点云，如果半径为1厘米的邻接点的数量少于2个，则剔除离群点。之后，在20厘米到300厘米的高度范围内，构建由三维B-spline 曲线代表的三维茎轴曲线[18]。

Then, the stem growth direction, i.e., the normal vector of the stem cross-sectional plane, and the stem cross-sectional plane within the height range along the stem could be calculated by the constructed stem axis curve. 

然后，通过构建的茎轴曲线，可以计算出茎的生长方向，即茎横断面的法向量，以及沿茎的高度范围内的茎横断面。

In other words, for a given stem height with in the height range, the stem cross-sectional plane at the given height can be calculated. 

换句话说，对于在高度范围内的一个给定的茎高，可以计算出给定高度下的茎横截面。

Therefore, the stem cross-sectional plane, which was located at the height at breast labeled by white paint (Figure 2), was calculated by the stem axis curve by searching for a suitable value for the height variable. 

因此，通过寻找高度变量的合适值，用茎轴曲线计算出茎的横截面，该横截面位于用白漆标注的胸前高度（图2）。

After that, a stem slice was formed by two parallel stem cross-sections called the lower stem cross-section and the upper stem cross-section. 

之后，由两个平行的茎部横截面形成一个茎部切片，称为下茎部横截面和上茎部横截面。

As the impact of the accuracy of DBH retrieval was not significant when the thickness of the stem cross-section was 1–10 cm [19], the lower (upper) section was parallel to and below (above) the stem cross-sectional plane at breast height with a distance of 2.5 cm in this study. 

由于当茎部横截面的厚度为1-10厘米时，对DBH检索的准确性影响不大[19]，在本研究中，下（上）部与胸高的茎部横截面平面平行并低于（高于）2.5厘米，距离为。

Thus, a stem slice with a length of 5 cm, i.e., stem points between the two constructed stem cross-sections, for a single tree was extracted. Then, for a stem slice, a 3D stem slice point cloud was obtained through geometric transformation by rotating the vector from the stem growth direction at breast height to the vector (0, 0, 1).

因此，提取了一棵树的长度为5厘米的茎切片，即两个构建的茎截面之间的茎点。然后，对于一个茎片，通过几何变换，将胸高处的茎部生长方向的矢量旋转到矢量（0，0，1），得到一个三维茎片点云。

Figure 2. The calculated stem cross-sectional plane at breast height. (a) The diagram of a stem cross-sectional plane location by the stem axis curve, (b) the enlarge view of (a). The blue curve represents the stem cross-sectional plane, and the red curve in (b) is the constructed stem axis curve.

图2. 计算出的胸高处的茎部横断面。(a)由茎轴曲线确定的茎横截面位置图，(b)(a)的放大图。蓝色曲线代表茎的横截面，(b)中的红色曲线是构建的茎轴曲线。

In this study, 165 3D stem slice point clouds were collected from 165 single trees. The stem diameter retrieval methods were separately applied to each 3D stem slice point cloud.

在这项研究中，从165棵单棵树上收集了165个三维茎切片点云。茎干直径检索方法分别应用于每个三维茎干切片点云。

# 2.3. Stem Diameter Retrieval Methods 

## 2.3.1. Method Simulation for the Diameter Tape

The initial inputs of the CYF, CF, CLF, CSM, SP and SPC methods were 3D stem slice point clouds, and different methods used different data derived from the 3D stem point clouds in the final calculation.

CYF、CF、CLF、CSM、SP和SPC方法的初始输入是三维茎部切片点云，不同的方法在最终计算中使用三维茎部点云得出的不同数据。

The final input of the CYF method was the 3D stem slice point cloud. 

CYF方法的最终输入是三维茎切片点云。

As the stem growth direction of the 3D stem slice point cloud was rotated to the vector (0, 0, 1) through geometric transformation, the stem growth direction, as well as the axis direction of the fitted cylinder, was equal to the vector (0, 0, 1). Then, the stem diameter was retrieved by CYF using the least squares method [30], which uses the axis direction as an input parameter.

由于三维茎切片点云的茎生长方向通过几何变换被旋转到矢量（0，0，1），因此，茎生长方向以及拟合圆柱体的轴线方向等于矢量（0，0，1）。然后，通过CYF使用最小二乘法[30]检索出茎的直径，该方法使用轴线方向作为输入参数。

The final input of the CF method was the two-dimensional(2D) stem slice point cloud, which was the projection point set of the 3D stem slice point cloud on the horizontal plane. 

CF方法的最终输入是二维（2D）茎部切片点云，它是三维茎部切片点云在水平面上的投影点集。

Then, the stem diameter was retrieved by CF using the least squares method.

然后，用最小二乘法通过CF检索出茎的直径。

The final input of the CLF method was the convex hull point set, which is the convex hull of the 2D stem slice point cloud. 

CLF方法的最终输入是凸壳点集，它是二维茎切片点云的凸壳。

Then, a convex hull polygon was obtained by connecting the two adjacent convex hull points. The stem diameter was equal to the perimeter of the convex hull polygon divided by the PI.

然后，通过连接相邻的两个凸壳点得到一个凸壳多边形。茎的直径等于凸壳多边形的周长除以PI。

The final input of the SP method was the convex hull point set. A closed cubic B-spline curve was interpolated on the convex hull point set using global interpolation [31]. The stem diameter was equal to the length of the closure B-spline curve divided by the PI.

SP方法的最终输入是凸壳点集。使用全局插值法[31]在凸壳点集上插值出一条封闭的立方B-spline曲线。茎的直径等于封闭B-spline曲线的长度除以PI。


The final input of the SPC method was the convex hull point set. A closed convex cubic Bézier curve was obtained by constructing piecewise cubic Bézier curves with second-order geometric continuity and global convexity [32]. The stem diameter was equal to the length of the closure convex curve divided by the PI. Diagrams of the above methods with a stem slice point cloud are shown in Figure 3.

SPC方法的最终输入是凸壳点集。通过构建具有二阶几何连续性和全局凸性的分片立方贝塞尔曲线，得到了闭合凸形贝塞尔曲线[32]。茎部直径等于闭合凸形曲线的长度除以PI。上述方法与茎部切片点云的示意图见图3。

Figure 3. Diagrams of stem diameter retrieval methods using a stem slice point cloud with an ovality (Section 2.3.2) of 6.69%. (a) A 3D stem slice point cloud; (b) CYF in 3D space; (c) the projection of the 3D stem slice point cloud and fitting points by CYF; (d) CF; (e) the projection of the 3D stem slice point cloud and its convex hull points; (f) SP; (g) CLF; (h) SPC. The rectangles in (f–h) represent the distinction part for the corresponding three methods. The black points represent stem points in 3D space(or their projection in 2D space), the blue points represent convex hull points, the red surface in (b) represents the surface of the fitted cylinder, and the red points (curve) represent the fitted points (curve).

图3. 使用椭圆度（2.3.2节）为6.69%的茎部切片点云的茎部直径检索方法示意图。(a) 三维茎切片点云；(b) 三维空间的CYF；(c) 三维茎切片点云的投影和CYF的拟合点；(d) CF；(e) 三维茎切片点云的投影和其凸壳点；(f) SP；(g) CLF；(h) SPC。(f-h)中的矩形代表相应三种方法的区分部分。黑色的点代表三维空间中的茎干点（或其在二维空间中的投影），蓝色的点代表凸壳点，（b）中的红色表面代表拟合圆柱体的表面，红色的点（曲线）代表拟合点（曲线）。

## 2.3.2. Method Simulation of the Caliper

To the best of our knowledge, there have been no reported studies using caliper simulation to retrieve stem diameter using TLS data. 

据我们所知，还没有使用卡尺模拟来检索茎部直径的TLS数据的研究报道。

In this study, we presented a caliper simulation method (CSM) to retrieve stem diameter using TLS data. 

在这项研究中，我们提出了一种卡尺模拟方法（CSM），利用TLS数据检索茎干直径。

The final input of the CSM method was the convex hull point set. In the field work, the two arms of the caliper were parallel and located on the convex part of the stem cross-section in each measurement direction. 

CSM方法的最终输入是凸壳点集。在现场工作中，卡尺的两个臂是平行的，位于每个测量方向上的茎干横截面的凸起部分。

Thus, the two arms could be seen as two parallel lines that just passed through the convex part of the stem cross-section, while the entire region of the stem cross-section was located between the two lines. 

因此，这两条手臂可以被看作是两条平行线，正好穿过茎部横截面的凸起部分，而茎部横截面的整个区域则位于这两条线之间。

To ensure the accuracy of the CSM method, the convex hull point set was divided into k (72 regions in this study) angular regions by the angle interval α (set to 5 in this study) degrees, and the angle value η between convex hull points and the geometrical central point of the convex hull point set. 

为了保证CSM方法的准确性，将凸壳点集按角度区间α（本研究中设定为5）度划分为k（本研究中为72个区域）个角度区域，凸壳点与凸壳点集的几何中心点的角度值η。

Thus, convex hull points fell into different angle regions. 

因此，凸壳点落入不同的角度区域。

The i-th region and (i + 360/2α)-th region (0 ≤ i ≤ 360/2α − 1) formed the i-th caliper measurement direction. 

第i个区域和（i+360/2α）-个区域（0≤i≤360/2α-1）形成了第i个卡尺测量方向。

Then, the caliper measurement could be simulated 360/2α times. For i-th direction, two lines were constructed to simulate the two arms of the caliper (Figure 4). The direction vector of the two lines was (sin(i × α + α/2), cos(i × α + α/2)).

然后，卡尺的测量可以被模拟 360/2α 次。对于第 i 个方向，构建两条线来模拟卡尺的两个臂（图4）。两条线的方向矢量是（sin（i × α + α/2），cos（i × α + α/2））。

Figure 4. The diagram of the CSM. The black points represent the 2D stem slice points. The blue diamond points represent the convex hull points of the 2D stem slice point cloud. The colored lines with squares represent the simulated caliper arms, and the two lines in one direction are described in the same color. The red diamond points represent the two convex hull points that the two lines pass through.

图4. CSM的示意图。黑色的点代表二维茎部切片点。蓝色钻石点代表二维茎切片点云的凸壳点。带方块的彩色线条代表模拟卡尺臂，一个方向的两条线用相同的颜色描述。红色钻石点代表两条线经过的两个凸壳点。

After that, the convex hull point set was searched for the two convex hull points to ensure that the two lines passed through the two identified convex hull points and that the other convex hull points were located between the two lines. Then, the distance of the two lines was the stem diameter of the i-th region by caliper simulation. Finally, the final stem diameter, i.e., the average value of the stem diameters in 360/2α directions, was calculated after caliper simulation in each direction.

之后，对凸壳点集进行搜索，确保两条线穿过两个确定的凸壳点，并且其他凸壳点位于两条线之间。然后，通过卡尺模拟，这两条线的距离就是第i个区域的茎部直径。最后，在每个方向的卡尺模拟后，计算出最终的茎部直径，即360/2α方向上的茎部直径的平均数值。

Based on the CSM method, the maximum and minimum stem diameters were retrieved from the 360/2α direction measurements. Thus, the ovality in percent [33] for a 3D stem slice point cloud was calculated according to the following formula. 

基于CSM方法，从360/2α方向的测量中检索出最大和最小的茎直径。因此，三维茎切片点云的椭圆度（百分比）[33]是根据以下公式计算的。

O = (1 − DMin/DMax ) × 100 (1)

where DMin and DMax represent the minimum and maximum stem diameters measured from the 360/2α directions.

其中，DMin和DMax代表从360/2α方向测量的最小和最大茎直径。

## 2.4. The Completeness of a Stem Slice Point Cloud 茎秆点云的完整程度

The more complete a stem slice point cloud is, the clearer the geometry information of the real stem slice and the more the persuasive the retrieved stem parameters. It is hoped that the stem points to be evenly distributed around the center of the stem slice point cloud.



However, due to various fielding work factors, not all the point clouds scanned by TLS can meet this demand. The completeness C of a stem slice point cloud according to the angular regions of convex hull point set in Section 2.3.2, is presented in this study. The 2D stem slice point cloud was divided into k angular regions with an angle interval α (set to 5 in this study), and meeting k = 360/α . The number of nonempty angular regions kn was initialized to zero; if the i-th (0 ≤ i < k) angular region was is a nonempty angular region, i.e., at least one point was in the current angular region, the number of nonempty angular regions kn increased by one. Then, the completeness C of a stem slice point cloud could be calculated as follows.

C = (kn/k) × 100 (2)

## 2.5. The Roughness of a Stem Slice Point Cloud

The internal points of a stem slice point cloud were used in the CYF and CF methods;
however, these points were not used in the CLF, CSM, SP and SPC methods. It is necessary
to know the distance information between the innermost point and the outermost point of
a stem slice point cloud. In this study, the roughness of a stem slice point cloud is presented
to represent the distance information. Based on the angular regions from Section 2.3.2, for
the i-th nonempty angular region ti
(0 ≤ i < k) in a stem slice point cloud, the maximum
and minimum distances between the geometrical central point and ti angular region points
were first calculated, and then the roughness ri of ti was equal to the difference between the
maximum distance and minimum distance. The roughness R of a stem slice point cloud
was the average of ri
from nonempty angular regions.
R =
∑(ri)
kn
(3)
Notably, a stem slice point cloud cannot fully reflect the real case of a stem slice due to
the influence of occlusion and other scanning factors. Hence, the ovality, completeness and
roughness here belonged to a stem slice point cloud rather than a real stem slice. Obviously,
there was a gap between the ovality of the stem slice point cloud and that of the real stem
slice when there were missed stem points in the stem slice point cloud. For example, a stem
slice point cloud was sourced only from TLS single-scan data; in this case, the completeness
of the stem slice point cloud was not more than 50%. However, when the completeness of
the stem slice point cloud was 100%, the ovality of the stem slice point cloud could be seen
as the ovality of the real stem slice.