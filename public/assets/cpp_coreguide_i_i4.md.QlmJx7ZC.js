import{_ as e,c as o,o as t,R as n}from"./chunks/framework.2bglP9T5.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"cpp/coreguide/i/i4.md","filePath":"cpp/coreguide/i/i4.md"}'),a={name:"cpp/coreguide/i/i4.md"},i=n(`<h3 id="i-4-使接口严格和强类型化" tabindex="-1"><a name="Ri-typed"></a>I.4: 使接口严格和强类型化 <a class="header-anchor" href="#i-4-使接口严格和强类型化" aria-label="Permalink to &quot;&lt;a name=&quot;Ri-typed&quot;&gt;&lt;/a&gt;I.4: 使接口严格和强类型化&quot;">​</a></h3><h5 id="理由" tabindex="-1">理由 <a class="header-anchor" href="#理由" aria-label="Permalink to &quot;理由&quot;">​</a></h5><p>类型是最简单和最好的文档，它们有定义明确的含义并因而提高了易读性，并且是在编译期进行检查的。 而且，严格类型化的代码通常也能更好地进行优化。</p><h5 id="示例-请勿这样做" tabindex="-1">示例，请勿这样做 <a class="header-anchor" href="#示例-请勿这样做" aria-label="Permalink to &quot;示例，请勿这样做&quot;">​</a></h5><p>考虑：</p><pre><code>void pass(void* data);    // 使用弱的并且缺乏明确性的类型 void* 是有问题的
</code></pre><p>调用者无法确定它允许使用哪些类型，而且因为它并没有指定 <code>const</code>， 也不确定其数据是否会被改动。注意，任何指针类型都可以隐式转换为 <code>void*</code>， 因此调用者很容易提供这样的值给它。</p><p>被调用方必须以 <code>static_cast</code> 将数据强制转换为某个无验证的类型以使用它。 这样做易于犯错，而且啰嗦。</p><p>应当仅在设计中无法以 C++ 来予以描述的数据的传递时才使用 <code>const void*</code>。请考虑使用 <code>variant</code> 或指向基类的指针来代替它。</p><p><strong>替代方案</strong>: 通常，利用模板形参可以把 <code>void*</code> 排除而改为 <code>T*</code> 或者 <code>T&amp;</code>。 对于泛型代码，这些个 <code>T</code> 可以是一般模板参数或者是概念约束的模板参数。</p><h5 id="示例-不好" tabindex="-1">示例，不好 <a class="header-anchor" href="#示例-不好" aria-label="Permalink to &quot;示例，不好&quot;">​</a></h5><p>考虑：</p><pre><code>draw_rect(100, 200, 100, 500); // 这些数值什么意思？

draw_rect(p.x, p.y, 10, 20); // 10 和 20 的单位是什么？
</code></pre><p>很明显调用者在描述一个矩形，不明确的是它们都和其哪些部分相关。而且 <code>int</code> 可以表示任何形式的信息，包括各种不同单位的值，因此我们必须得猜测这四个 <code>int</code> 的含义。前两个很可能代表坐标对偶 <code>x</code> 和 <code>y</code>，但后两个是什么呢？</p><p>注释和参数的名字可以有所帮助，但我们可以直截了当：</p><pre><code>void draw_rectangle(Point top_left, Point bottom_right);
void draw_rectangle(Point top_left, Size height_width);

draw_rectangle(p, Point{10, 20});  // 两个角点
draw_rectangle(p, Size{10, 20});   // 一个角和一对 (height, width)
</code></pre><p>显然，我们是无法利用静态类型系统识别所有的错误的， 例如，假定第一个参数是左上角这一点就依赖于约定（命名或者注释）。</p><h5 id="示例-不好-1" tabindex="-1">示例，不好 <a class="header-anchor" href="#示例-不好-1" aria-label="Permalink to &quot;示例，不好&quot;">​</a></h5><p>考虑：</p><pre><code>set_settings(true, false, 42); // 这些数值什么意思？
</code></pre><p>各参数类型及其值并不能表明其所指定的设置项是什么以及它们的值所代表的含义。</p><p>下面的设计则更加明确，安全且易读：</p><pre><code>alarm_settings s{};
s.enabled = true;
s.displayMode = alarm_settings::mode::spinning_light;
s.frequency = alarm_settings::every_10_seconds;
set_settings(s);
</code></pre><p>对于一组布尔值的情况，可以考虑使用某种标记 <code>enum</code>；这是一种用于表示一组布尔值的模式。</p><pre><code>enable_lamp_options(lamp_option::on | lamp_option::animate_state_transitions);
</code></pre><h5 id="示例-不好-2" tabindex="-1">示例，不好 <a class="header-anchor" href="#示例-不好-2" aria-label="Permalink to &quot;示例，不好&quot;">​</a></h5><p>下例中，接口中并未明确给出 <code>time_to_blink</code> 的含义：按秒还是按毫秒算？</p><pre><code>void blink_led(int time_to_blink) // 不好 -- 在单位上含糊
{
    // ...
    // 对 time_to_blink 做一些事
    // ...
}

void use()
{
    blink_led(2);
}
</code></pre><h5 id="示例-好" tabindex="-1">示例，好 <a class="header-anchor" href="#示例-好" aria-label="Permalink to &quot;示例，好&quot;">​</a></h5><p><code>std::chrono::duration</code> 类型可以让时间段的单位明确下来。</p><pre><code>void blink_led(milliseconds time_to_blink) // 好 -- 单位明确
{
    // ...
    // 对 time_to_blink 做一些事
    // ...
}

void use()
{
    blink_led(1500ms);
}
</code></pre><p>这个函数还可以写成使其接受任何时间段单位的形式。</p><pre><code>template&lt;class rep, class period&gt;
void blink_led(duration&lt;rep, period&gt; time_to_blink) // 好 -- 接受任何单位
{
    // 假设最小的有意义单位是毫秒
    auto milliseconds_to_blink = duration_cast&lt;milliseconds&gt;(time_to_blink);
    // ...
    // 对 milliseconds_to_blink 做一些事
    // ...
}

void use()
{
    blink_led(2s);
    blink_led(1500ms);
}
</code></pre><h5 id="强制实施" tabindex="-1">强制实施 <a class="header-anchor" href="#强制实施" aria-label="Permalink to &quot;强制实施&quot;">​</a></h5><ul><li>【简单】 报告将 <code>void*</code> 用作参数或返回类型的情况</li><li>【简单】 报告使用了多个 <code>bool</code> 参数的情况</li><li>【难于做好】 查找使用了过多基础类型的参数的函数。</li></ul>`,35),d=[i];function c(r,l,p,s,_,h){return t(),o("div",null,d)}const b=e(a,[["render",c]]);export{u as __pageData,b as default};
