(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{337:function(n,s,a){"use strict";a.r(s),s.default='<p><code>externals</code> 配置选项提供了「从输出的 bundle 中排除依赖」的方法。相反，所创建的 bundle 依赖于那些存在于用户环境(consumer\'s environment)中的依赖。此功能通常对 <strong>library 开发人员</strong>来说是最有用的，然而也会有各种各样的应用程序用到它。</p>\n<h2><code>externals</code></h2>\n<p><code>string</code> <code>[string]</code> <code>object</code> <code>function</code>  <code>RegExp</code></p>\n<p><strong>防止</strong>将某些 <code>import</code> 的包(package)<strong>打包</strong>到 bundle 中，而是在运行时(runtime)再去从外部获取这些<em>扩展依赖(external dependencies)</em>。</p>\n<p>例如，从 CDN 引入 <a href="https://jquery.com/">jQuery</a>，而不是把它打包：</p>\n<p><strong>index.html</strong></p>\n<pre><code class="hljs language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>script</span>\n  <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>https://code.jquery.com/jquery-3.1.0.js<span class="token punctuation">"</span></span>\n  <span class="token attr-name">integrity</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk=<span class="token punctuation">"</span></span>\n  <span class="token attr-name">crossorigin</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>anonymous<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script language-javascript">\n</span><span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>script</span><span class="token punctuation">></span></span></code></pre>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  externals<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    jquery<span class="token punctuation">:</span> <span class="token string">\'jQuery\'</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>这样就剥离了那些不需要改动的依赖模块，换句话，下面展示的代码还可以正常运行：</p>\n<pre><code class="hljs language-javascript"><span class="token keyword">import</span> $ <span class="token keyword">from</span> <span class="token string">\'jquery\'</span><span class="token punctuation">;</span>\n\n<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">\'.my-element\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">animate</span><span class="token punctuation">(</span><span class="token comment">/* ... */</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p>具有外部依赖(external dependency)的 bundle 可以在各种模块上下文(module context)中使用，例如 <a href="/concepts/modules">CommonJS, AMD, 全局变量和 ES2015 模块</a>。外部 library 可能是以下任何一种形式：</p>\n<ul>\n<li><strong>root</strong>：可以通过一个全局变量访问 library（例如，通过 script 标签）。</li>\n<li><strong>commonjs</strong>：可以将 library 作为一个 CommonJS 模块访问。</li>\n<li><strong>commonjs2</strong>：和上面的类似，但导出的是 <code>module.exports.default</code>.</li>\n<li><strong>amd</strong>：类似于 <code>commonjs</code>，但使用 AMD 模块系统。</li>\n</ul>\n<p>可以接受以下语法……</p>\n<h3>字符串</h3>\n<p>请查看上面的例子。属性名称是 <code>jquery</code>，表示应该排除 <code>import $ from \'jquery\'</code> 中的 <code>jquery</code> 模块。为了替换这个模块，<code>jQuery</code> 的值将被用来检索一个全局的 <code>jQuery</code> 变量。换句话说，当设置为一个字符串时，它将被视为<code>全局的</code>（定义在上面和下面）。</p>\n<p>另一方面，如果你想将一个符合 CommonJS 模块化规则的类库外部化，你可以提供外联类库的类型以及类库的名称。</p>\n<p>如果你想将 <code>fs-extra</code> 从输出的 bundle 中剔除并在运行时中引入它，你可以如下定义：</p>\n<pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">// ...</span>\n  externals<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    <span class="token string">\'fs-extra\'</span><span class="token punctuation">:</span> <span class="token string">\'commonjs2 fs-extra\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>这样的做法会让任何依赖的模块都不变，正如以下所示的代码：</p>\n<pre><code class="hljs language-javascript"><span class="token keyword">import</span> fs <span class="token keyword">from</span> <span class="token string">\'fs-extra\'</span><span class="token punctuation">;</span></code></pre>\n<p>会将代码编译成：</p>\n<pre><code class="hljs language-javascript"><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'fs-extra\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<h3>字符串数组</h3>\n<pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  externals<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    subtract<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'./math\'</span><span class="token punctuation">,</span> <span class="token string">\'subtract\'</span><span class="token punctuation">]</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p><code>subtract: [\'./math\', \'subtract\']</code> 转换为父子结构，其中 <code>./math</code> 是父模块，而 bundle 只引用 <code>subtract</code> 变量下的子集。该例子会编译成 <code>require(\'./math\').subtract;</code></p>\n<h3>对象</h3>\n<blockquote class="warning">\n<p>一个形如  <code>{ root, amd, commonjs, ... }</code> 的对象仅允许用于  <a href="/configuration/output/#outputlibrarytarget"><code>libraryTarget: \'umd\'</code></a> 这样的配置.它不被允许 用于其它的 library targets 配置值.</p>\n</blockquote>\n<pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  externals <span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    react<span class="token punctuation">:</span> <span class="token string">\'react\'</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n  <span class="token comment">// 或者</span>\n\n  externals <span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    lodash <span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      commonjs<span class="token punctuation">:</span> <span class="token string">\'lodash\'</span><span class="token punctuation">,</span>\n      amd<span class="token punctuation">:</span> <span class="token string">\'lodash\'</span><span class="token punctuation">,</span>\n      root<span class="token punctuation">:</span> <span class="token string">\'_\'</span> <span class="token comment">// 指向全局变量</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n  <span class="token comment">// 或者</span>\n\n  externals <span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    subtract <span class="token punctuation">:</span> <span class="token punctuation">{</span>\n      root<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'math\'</span><span class="token punctuation">,</span> <span class="token string">\'subtract\'</span><span class="token punctuation">]</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>此语法用于描述外部 library 所有可用的访问方式。这里 <code>lodash</code> 这个外部 library 可以在 AMD 和 CommonJS 模块系统中通过 <code>lodash</code> 访问，但在全局变量形式下用 <code>_</code> 访问。<code>subtract</code> 可以通过全局 <code>math</code> 对象下的属性 <code>subtract</code> 访问（例如 <code>window[\'math\'][\'subtract\']</code>）。</p>\n<h3>函数</h3>\n<p><code>function (context, request, callback)</code></p>\n<p>对于 webpack 外部化，通过定义函数来控制行为，可能会很有帮助。例如，<a href="https://www.npmjs.com/package/webpack-node-externals">webpack-node-externals</a> 能够排除 <code>node_modules</code> 目录中所有模块，还提供一些选项，比如白名单 package(whitelist package)。</p>\n<p>函数接收三个入参：</p>\n<ul>\n<li><code>context</code> (<code>string</code>): 包含引用的文件目录。</li>\n<li><code>request</code> (<code>string</code>): 被请求引入的路径。</li>\n<li><code>callback</code> (<code>function (err, result, type)</code>): 用于指明模块如何被外部化的回调函数</li>\n</ul>\n<p>回调函数接收三个入参：</p>\n<ul>\n<li><code>err</code> (<code>Error</code>): 被用于表明在外部外引用的时候是否会产生错误。如果有错误，这将会是唯一被用到的参数。</li>\n<li><code>result</code> (<code>string</code> <code>[string]</code> <code>object</code>): 描述外部化的模块。可以接受形如 <code>${type} ${path}</code> 格式的字符串，或者其它标准化外部化模块格式，(<a href="#string"><code>string</code></a>, <a href="#string-1"><code>[string]</code></a>，或 <a href="#object"><code>object</code></a>)。</li>\n<li><code>type</code> (<code>string</code>): 可选的参数，用于指明模块的类型（如果它没在 <code>result</code> 参数中被指明）。</li>\n</ul>\n<p>作为例子，要外部化所有匹配一个正则表达式的引入，你可以像下面那样处理：</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  externals<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token keyword">function</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> request<span class="token punctuation">,</span> callback<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token regex">/^yourregex$/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token comment">// 使用 request 路径，将一个 commonjs 模块外部化</span>\n        <span class="token keyword">return</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">\'commonjs \'</span> <span class="token operator">+</span> request<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n\n      <span class="token comment">// 继续下一步且不外部化引用</span>\n      <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>其它例子使用不同的模块格式：</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  externals<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token keyword">function</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> request<span class="token punctuation">,</span> callback<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// 该外部化的模块，是一个 `commonjs2` 的模块，且放在 `@scope/library` 目录中</span>\n      <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">\'@scope/library\'</span><span class="token punctuation">,</span> <span class="token string">\'commonjs2\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  externals<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token keyword">function</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> request<span class="token punctuation">,</span> callback<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// 该外部化模块是一个全局变量叫作 `nameOfGlobal`.</span>\n      <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">\'nameOfGlobal\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  externals<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token keyword">function</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> request<span class="token punctuation">,</span> callback<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// 该外部化模块是一个在`@scope/library`模块里的命名导出（named export）。</span>\n      <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">\'@scope/library\'</span><span class="token punctuation">,</span> <span class="token string">\'namedexport\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">\'commonjs\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  externals<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token keyword">function</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> request<span class="token punctuation">,</span> callback<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token comment">// 外部化模块是一个 UMD 模块</span>\n      <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n        root<span class="token punctuation">:</span> <span class="token string">\'componentsGlobal\'</span><span class="token punctuation">,</span>\n        commonjs<span class="token punctuation">:</span> <span class="token string">\'@scope/components\'</span><span class="token punctuation">,</span>\n        commonjs2<span class="token punctuation">:</span> <span class="token string">\'@scope/components\'</span><span class="token punctuation">,</span>\n        amd<span class="token punctuation">:</span> <span class="token string">\'components\'</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<h3>RegExp</h3>\n<p>匹配给定正则表达式的每个依赖，都将从输出 bundle 中排除。</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  externals<span class="token punctuation">:</span> <span class="token regex">/^(jquery|\\$)$/i</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>这个示例中，所有名为 <code>jQuery</code> 的依赖（忽略大小写），或者 <code>$</code>，都会被外部化。</p>\n<h3>混用语法</h3>\n<p>有时你需要混用上面介绍的语法。这可以像以下这样操作：</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  externals<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token punctuation">{</span>\n      <span class="token comment">// 字符串</span>\n      react<span class="token punctuation">:</span> <span class="token string">\'react\'</span><span class="token punctuation">,</span>\n      <span class="token comment">// 对象</span>\n      lodash <span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        commonjs<span class="token punctuation">:</span> <span class="token string">\'lodash\'</span><span class="token punctuation">,</span>\n        amd<span class="token punctuation">:</span> <span class="token string">\'lodash\'</span><span class="token punctuation">,</span>\n        root<span class="token punctuation">:</span> <span class="token string">\'_\'</span> <span class="token comment">// indicates global variable</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token comment">// 字符串数组</span>\n      subtract<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'./math\'</span><span class="token punctuation">,</span> <span class="token string">\'subtract\'</span><span class="token punctuation">]</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token comment">// 函数</span>\n    <span class="token keyword">function</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> request<span class="token punctuation">,</span> callback<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token regex">/^yourregex$/</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">\'commonjs \'</span> <span class="token operator">+</span> request<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n      <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token comment">// 正则表达式</span>\n    <span class="token operator">/</span><span class="token operator">^</span><span class="token punctuation">(</span>jquery<span class="token operator">|</span>\\$<span class="token punctuation">)</span>$<span class="token operator">/</span>i\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<blockquote class="warning">\n<p><a href="/configuration/externals/#externalstype">Default type</a> will be used if you specify <code>externals</code> without a type e.g. <code>externals: { react: \'react\' }</code> instead of <code>externals: { react: \'commonjs-module react\' }</code>.</p>\n</blockquote>\n<p>关于如何使用此 externals 配置的更多信息，请参考 <a href="/guides/author-libraries">如何编写 library</a>。</p>\n<h2><code>externalsType</code></h2>\n<p><code>string = \'var\'</code></p>\n<p>Specifies the default type of externals. <code>amd</code>, <code>root</code> and <code>system</code> externals <strong>depend on the <a href="/configuration/output/#outputlibrarytarget"><code>output.libraryTarget</code></a></strong> being set to the same value e.g. you can only consume <code>amd</code> externals within an <code>amd</code> library.</p>\n<p>Supported types:</p>\n<ul>\n<li><code>\'var\'</code></li>\n<li><code>\'module\'</code></li>\n<li><code>\'assign\'</code></li>\n<li><code>\'this\'</code></li>\n<li><code>\'window\'</code></li>\n<li><code>\'self\'</code></li>\n<li><code>\'global\'</code></li>\n<li><code>\'commonjs\'</code></li>\n<li><code>\'commonjs-module\'</code></li>\n<li><code>\'amd\'</code></li>\n<li><code>\'amd-require\'</code></li>\n<li><code>\'umd\'</code></li>\n<li><code>\'umd2\'</code></li>\n<li><code>\'jsonp\'</code></li>\n<li><code>\'system\'</code></li>\n<li><code>\'promise\'</code> - same as <code>\'var\'</code> but awaits the result (async module, depends on <a href="/configuration/experiments/"><code>experiments.importAsync</code></a>)</li>\n<li><code>\'import\'</code> - uses <code>import()</code> to load a native EcmaScript module (async module, depends on <a href="/configuration/experiments/"><code>experiments.importAsync</code></a>)</li>\n</ul>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-javascript">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  externalsType<span class="token punctuation">:</span> <span class="token string">\'promise\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n'}}]);