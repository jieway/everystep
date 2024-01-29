import{_ as e,c as o,o as r,R as a}from"./chunks/framework.2bglP9T5.js";const g=JSON.parse('{"title":"log 模块","description":"","frontmatter":{},"headers":[],"relativePath":"aryadb/7-log.md","filePath":"aryadb/7-log.md"}'),t={name:"aryadb/7-log.md"},p=a(`<h1 id="log-模块" tabindex="-1">log 模块 <a class="header-anchor" href="#log-模块" aria-label="Permalink to &quot;log 模块&quot;">​</a></h1><p><code>db/log_format.h</code></p><p>日志文件的内容是一系列32KB大小的块。唯一的例外是文件的尾部可能包含一个部分块。</p><p>每个块由一系列记录组成：</p><pre><code>block := record* trailer?
record :=
  checksum: uint32     // type和data[]的crc32c校验和；小端序
  length: uint16       // 小端序
  type: uint8          // 其中之一：FULL, FIRST, MIDDLE, LAST
  data: uint8[length]
</code></pre><p>记录永远不会在块的最后六个字节内开始（因为放不下，头部最少要七个字节）。</p><p>这里的任何剩余字节形成trailer，必须完全由零字节组成，并且读取时必须跳过。</p><p>旁注：如果当前块中恰好剩下七个字节，并且添加了一个新的非零长度记录，写入者必须发出一个FIRST记录（其中包含零字节的用户数据）来填满块的后七个字节，然后在后续块中发出所有用户数据。</p><p>将来可能会添加更多类型。一些读取器可能会跳过它们不理解的记录类型，其他读取器可能会报告跳过了一些数据。</p><pre><code>FULL == 1
FIRST == 2
MIDDLE == 3
LAST == 4
</code></pre><p>FULL记录包含整个用户记录的内容。</p><p>FIRST, MIDDLE, LAST 是用于已经分割成多个片段的用户记录的类型（通常是因为块边界）。FIRST是用户记录的第一个片段的类型，LAST是用户记录的最后一个片段的类型，MIDDLE是用户记录的所有内部片段的类型。</p><p>示例：考虑一系列用户记录：</p><pre><code>A: 长度 1000
B: 长度 97270
C: 长度 8000
</code></pre><p><strong>A</strong> 将作为一个FULL记录存储在第一个块中。</p><p><strong>B</strong> 将被分割成三个片段：第一个片段占据第一个块的剩余部分，第二个片段占据整个第二个块，第三个片段占据第三个块的前缀。这将在第三个块中留下六个空字节，作为trailer留空。</p><p><strong>C</strong> 将作为一个FULL记录存储在第四个块中。</p><hr><h2 id="相比于recordio格式的一些优势" tabindex="-1">相比于recordio格式的一些优势： <a class="header-anchor" href="#相比于recordio格式的一些优势" aria-label="Permalink to &quot;相比于recordio格式的一些优势：&quot;">​</a></h2><ol><li><p>我们不需要任何重新同步的启发式方法 - 只需转到下一个块边界并扫描。如果有损坏，跳到下一个块。作为一个附带好处，当一个日志文件的部分内容作为记录嵌入到另一个日志文件中时，我们不会感到困惑。</p></li><li><p>在大致边界处分割（例如，对于mapreduce）很简单：找到下一个块边界，跳过记录直到我们遇到一个FULL或FIRST记录。</p></li><li><p>对于大记录，我们不需要额外的缓冲。</p></li></ol><h2 id="与recordio格式相比的一些缺点" tabindex="-1">与recordio格式相比的一些缺点： <a class="header-anchor" href="#与recordio格式相比的一些缺点" aria-label="Permalink to &quot;与recordio格式相比的一些缺点：&quot;">​</a></h2><ol><li><p>没有打包微小记录的功能。这可以通过添加一个新的记录类型来解决，所以它是当前实现的缺点，不一定是格式本身。</p></li><li><p>没有压缩。同样，这可以通过添加新的记录类型来解决。</p></li></ol>`,22),n=[p];function c(i,l,d,s,_,h){return r(),o("div",null,n)}const u=e(t,[["render",c]]);export{g as __pageData,u as default};
