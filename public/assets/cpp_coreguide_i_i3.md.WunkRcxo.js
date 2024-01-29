import{_ as e,c as a,o,R as t}from"./chunks/framework.2bglP9T5.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"cpp/coreguide/i/i3.md","filePath":"cpp/coreguide/i/i3.md"}'),i={name:"cpp/coreguide/i/i3.md"},c=t(`<h3 id="i-3-避免使用单例" tabindex="-1"><a name="Ri-singleton"></a>I.3: 避免使用单例 <a class="header-anchor" href="#i-3-避免使用单例" aria-label="Permalink to &quot;&lt;a name=&quot;Ri-singleton&quot;&gt;&lt;/a&gt;I.3: 避免使用单例&quot;">​</a></h3><h5 id="理由" tabindex="-1">理由 <a class="header-anchor" href="#理由" aria-label="Permalink to &quot;理由&quot;">​</a></h5><p>单例基本上就是经过伪装的更复杂的全局对象。</p><h5 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h5><pre><code>class Singleton {
    // ... 大量代码，用于确保只创建一个 Singleton，
    // 进行正确地初始化，等等
};
</code></pre><p>单例的想法有许多变种。 这也是问题的一方面。</p><h5 id="注解" tabindex="-1">注解 <a class="header-anchor" href="#注解" aria-label="Permalink to &quot;注解&quot;">​</a></h5><p>如果不想让全局对象被改变，请将其声明为 <code>const</code> 或 <code>constexpr</code>。</p><h5 id="例外" tabindex="-1">例外 <a class="header-anchor" href="#例外" aria-label="Permalink to &quot;例外&quot;">​</a></h5><p>你可以使用最简单的“单例”形式（简单到通常不被当作单例）来获得首次使用时进行初始化的效果：</p><pre><code>X&amp; myX()
{
    static X my_x {3};
    return my_x;
}
</code></pre><p>这是解决初始化顺序相关问题的最有效方案之一。 在多线程环境中，静态对象的初始化并不会引入数据竞争条件 （除非你不小心在其构造函数中访问了某个共享对象）。</p><p>注意局部的 <code>static</code> 对象初始化并不会蕴含竞争条件。 不过，如果 <code>X</code> 的销毁中涉及了需要进行同步的操作的话，我们就得用一个不那么简单的方案。 例如：</p><pre><code>X&amp; myX()
{
    static auto p = new X {3};
    return *p;  // 有可能泄漏
}
</code></pre><p>这样就必须有人以某种适当的线程安全方式来 <code>delete</code> 这个对象了。 这是容易出错的，因此除了以下情况外我们并不使用这种技巧：</p><ul><li><code>myX</code> 是在多线程代码中，</li><li>这个 <code>X</code> 对象需要销毁（比如由于它要释放某个资源），而且</li><li><code>X</code> 的析构函数的代码需要进行同步。</li></ul><p>如果你和许多人一样把单例定义为只能创建一个对象的类的话，像 <code>myX</code> 这样的函数并非单例，而且这种好用的技巧并不算无单例规则的例外。</p><h5 id="强制实施" tabindex="-1">强制实施 <a class="header-anchor" href="#强制实施" aria-label="Permalink to &quot;强制实施&quot;">​</a></h5><p>通常非常困难。</p><ul><li>查找名字中包含 <code>singleton</code> 的类。</li><li>查找只创建一个对象的类（通过对对象计数或者检查其构造函数）。</li><li>如果某个类 X 具有公开的静态函数，并且它包含具有该类 X 类型的函数级局部静态变量并返回指向它的指针或者引用，就禁止它。</li></ul>`,20),n=[c];function r(d,l,p,s,h,u){return o(),a("div",null,n)}const f=e(i,[["render",r]]);export{m as __pageData,f as default};
