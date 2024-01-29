import{_ as e,c as a,o as r,R as o}from"./chunks/framework.2bglP9T5.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"cpp/coreguide/i/i7.md","filePath":"cpp/coreguide/i/i7.md"}'),t={name:"cpp/coreguide/i/i7.md"},n=o(`<h3 id="i-7-说明后条件" tabindex="-1"><a name="Ri-post"></a>I.7: 说明后条件 <a class="header-anchor" href="#i-7-说明后条件" aria-label="Permalink to &quot;&lt;a name=&quot;Ri-post&quot;&gt;&lt;/a&gt;I.7: 说明后条件&quot;">​</a></h3><h5 id="理由" tabindex="-1">理由 <a class="header-anchor" href="#理由" aria-label="Permalink to &quot;理由&quot;">​</a></h5><p>以检测到对返回结果的误解，还可能发现实现中存在错误。</p><h5 id="示例-不好" tabindex="-1">示例，不好 <a class="header-anchor" href="#示例-不好" aria-label="Permalink to &quot;示例，不好&quot;">​</a></h5><p>考虑：</p><pre><code>int area(int height, int width) { return height * width; }  // 不好
</code></pre><p>这里，我们（粗心大意地）遗漏了前条件的说明，因此高度和宽度必须是正数这点是不明确的。 我们也遗漏了后条件的说明，因此算法（<code>height * width</code>）对于大于最大整数的面积来说是错误的这点是不明显的。 可能会有溢出。 应该考虑使用：</p><pre><code>int area(int height, int width)
{
    auto res = height * width;
    Ensures(res &gt; 0);
    return res;
}
</code></pre><h5 id="示例-不好-1" tabindex="-1">示例，不好 <a class="header-anchor" href="#示例-不好-1" aria-label="Permalink to &quot;示例，不好&quot;">​</a></h5><p>考虑一个著名的安全性 BUG：</p><pre><code>void f()    // 有问题的
{
    char buffer[MAX];
    // ...
    memset(buffer, 0, sizeof(buffer));
}
</code></pre><p>由于没有后条件来说明缓冲区应当被清零，优化器可能会将这个看似多余的 <code>memset()</code> 调用给清除掉：</p><pre><code>void f()    // 有改进
{
    char buffer[MAX];
    // ...
    memset(buffer, 0, sizeof(buffer));
    Ensures(buffer[0] == 0);
}
</code></pre><h5 id="注解" tabindex="-1">注解 <a class="header-anchor" href="#注解" aria-label="Permalink to &quot;注解&quot;">​</a></h5><p>后条件通常是在说明函数目的的代码注释中非正式地进行说明的；用 <code>Ensures()</code> 可以使之更加系统化，更加明显，并且更容易检查。</p><h5 id="注解-1" tabindex="-1">注解 <a class="header-anchor" href="#注解-1" aria-label="Permalink to &quot;注解&quot;">​</a></h5><p>后条件对于那些无法在所返回的结果中直接体现的东西来说尤其重要，比如要说明所用的数据结构。</p><h5 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h5><p>考虑一个操作 <code>Record</code> 的函数，它使用 <code>mutex</code> 来避免数据竞争条件：</p><pre><code>mutex m;

void manipulate(Record&amp; r)    // 请勿这样做
{
    m.lock();
    // ... 没有 m.unlock() ...
}
</code></pre><p>这里，我们“忘记”说明应当释放 <code>mutex</code>，因此我们搞不清楚这里 <code>mutex</code> 释放的缺失是一个 BUG 还是一种功能特性。 把后条件说明将使其更加明确：</p><pre><code>void manipulate(Record&amp; r)    // 后条件: m 在退出后是未锁定的
{
    m.lock();
    // ... 没有 m.unlock() ...
}
</code></pre><p>现在这个 BUG 就明显了（但仅对阅读了代码注释的人类来说）。</p><p>更好的做法是使用 <a href="#Rr-raii">RAII</a> 来在代码中保证后条件（“锁必须进行释放”）的实施：</p><pre><code>void manipulate(Record&amp; r)    // 最好这样
{
    lock_guard&lt;mutex&gt; _ {m};
    // ...
}
</code></pre><h5 id="注解-2" tabindex="-1">注解 <a class="header-anchor" href="#注解-2" aria-label="Permalink to &quot;注解&quot;">​</a></h5><p>理想情况下，后条件应当在接口或声明式中说明，让使用者易于见到它们。 只有那些与使用者有关的后条件才应当在接口中说明。 仅与内部状态相关的后条件应当属于定义式或实现。</p><h5 id="强制实施" tabindex="-1">强制实施 <a class="header-anchor" href="#强制实施" aria-label="Permalink to &quot;强制实施&quot;">​</a></h5><p>【无法强制实施】 这是一条理念性的指导方针，一般情况下进行直接的 检查是不可行的。不过许多工具链中都有适用于特定领域的检查器， 比如针对锁定持有情况的检查器。</p>`,29),i=[n];function d(c,h,p,l,s,u){return r(),a("div",null,i)}const _=e(t,[["render",d]]);export{f as __pageData,_ as default};
