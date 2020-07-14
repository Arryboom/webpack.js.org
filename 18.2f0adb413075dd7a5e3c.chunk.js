(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{307:function(n,s,a){"use strict";a.r(s),s.default='<p>本章节涵盖了使用 webpack 编译代码的所有方法。在 webpack 打包应用程序时，你可以选择各种模块语法风格，包括 <a href="https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015">ES6</a>，<a href="https://en.wikipedia.org/wiki/CommonJS">CommonJS</a> 和 <a href="https://en.wikipedia.org/wiki/Asynchronous_module_definition">AMD</a>。</p>\n<blockquote class="warning">\n<p>虽然 webpack 支持多种模块语法，但我们建议尽量遵循一致的语法，以此避免一些奇怪的行为和 bug。这是一个混合使用了 ES6 和 CommonJS 的<a href="https://github.com/webpack/webpack.js.org/issues/552">示例</a>，但肯定还会有其他的 bug 产生。</p>\n</blockquote>\n<h2>ES6 (推荐)</h2>\n<p>webpack 2 支持原生的 ES6 模块语法，意味着你无须额外引入 babel 这样的工具，就可以使用 <code>import</code> 和 <code>export</code>。但是注意，如果使用其他的 ES6+ 特性，仍然需要引入 babel。webpack 支持以下的方法：</p>\n<h3><code>import</code></h3>\n<p>通过 <code>import</code> 以静态的方式导入另一个通过 <code>export</code> 导出的模块。</p>\n<pre><code class="hljs language-javascript"><span class="token keyword">import</span> MyModule <span class="token keyword">from</span> <span class="token string">\'./my-module.js\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> NamedExport <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'./other-module.js\'</span><span class="token punctuation">;</span></code></pre>\n<blockquote class="warning">\n<p>这里的关键词是<strong>静态的</strong>。标准的 <code>import</code> 语句中，模块语句中不能以「具有逻辑或含有变量」的动态方式去引入其他模块。关于 import 的更多信息和 <code>import()</code> 动态用法，请查看这里的<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import">说明</a>。</p>\n</blockquote>\n<h3><code>export</code></h3>\n<p><code>默认</code>导出整个模块或具名导出模块。</p>\n<pre><code class="hljs language-javascript"><span class="token comment">// 具名导出</span>\n<span class="token keyword">export</span> <span class="token keyword">var</span> Count <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">Multiply</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> a <span class="token operator">*</span> b<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// 默认导出</span>\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  <span class="token comment">// Some data...</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<h3><code>import()</code></h3>\n<p><code>function(string path):Promise</code></p>\n<p>动态的加载模块。调用 <code>import</code> 的之处，被视为分割点，意思是，被请求的模块和它引用的所有子模块，会分割到一个单独的 chunk 中。</p>\n<blockquote class="tip">\n<p><a href="https://whatwg.github.io/loader/">ES2015 Loader 规范</a> 定义了 <code>import()</code> 方法，可以在运行时动态地加载 ES2015 模块。</p>\n</blockquote>\n<pre><code class="hljs language-javascript"><span class="token keyword">if</span> <span class="token punctuation">(</span> module<span class="token punctuation">.</span>hot <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">\'lodash\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>_ <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token comment">// Do something with lodash (a.k.a \'_\')...</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n<blockquote class="warning">\n<p>import() 特性依赖于内置的 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"><code>Promise</code></a>。如果想在低版本浏览器中使用 <code>import()</code>，记得使用像 <a href="https://github.com/stefanpenner/es6-promise">es6-promise</a> 或者 <a href="https://github.com/taylorhakes/promise-polyfill">promise-polyfill</a> 这样 polyfill 库，来预先填充(shim) <code>Promise</code> 环境。</p>\n</blockquote>\n<h3>import() 中的表达式</h3>\n<p>不能使用完全动态的 import 语句，例如 <code>import(foo)</code>。是因为 <code>foo</code> 可能是系统或项目中任何文件的任何路径。</p>\n<p><code>import()</code> 必须至少包含一些关于模块的路径信息。打包可以限定于一个特定的目录或文件集，以便于在使用动态表达式时 - 包括可能在 <code>import()</code> 调用中请求的每个模块。例如， <code>import(`./locale/${language}.json`)</code> 会把 <code>.locale</code> 目录中的每个 <code>.json</code> 文件打包到新的 chunk 中。在运行时，计算完变量 <code>language</code> 后，就可以使用像 <code>english.json</code> 或 <code>german.json</code> 的任何文件。</p>\n<pre><code class="hljs language-javascript"><span class="token comment">// 想象我们有一个从 cookies 或其他存储中获取语言的方法</span>\n<span class="token keyword">const</span> language <span class="token operator">=</span> <span class="token function">detectVisitorLanguage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`./locale/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>language<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.json`</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>module <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token comment">// do something with the translations</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<blockquote class="tip">\n<p>使用 <a href="/api/module-methods/#magic-comments"><code>webpackInclude</code> and <code>webpackExclude</code></a> 选项可让你添加正则表达式模式，以减少 webpack 打包导入的文件数量。</p>\n</blockquote>\n<h4>Magic Comments</h4>\n<p>内联注释使这一特性得以实现。通过在 import 中添加注释，我们可以进行诸如给 chunk 命名或选择不同模式的操作。</p>\n<pre><code class="hljs language-js"><span class="token comment">// 单个目标</span>\n<span class="token keyword">import</span><span class="token punctuation">(</span>\n  <span class="token comment">/* webpackChunkName: "my-chunk-name" */</span>\n  <span class="token comment">/* webpackMode: "lazy" */</span>\n  <span class="token comment">/* webpackExports: ["default", "named"] */</span>\n  <span class="token string">\'module\'</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// 多个可能的目标</span>\n<span class="token keyword">import</span><span class="token punctuation">(</span>\n  <span class="token comment">/* webpackInclude: /\\.json$/ */</span>\n  <span class="token comment">/* webpackExclude: /\\.noimport\\.json$/ */</span>\n  <span class="token comment">/* webpackChunkName: "my-chunk-name" */</span>\n  <span class="token comment">/* webpackMode: "lazy" */</span>\n  <span class="token comment">/* webpackPrefetch: true */</span>\n  <span class="token comment">/* webpackPreload: true */</span>\n  <span class="token template-string"><span class="token string">`./locale/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>language<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<pre><code class="hljs language-js"><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token comment">/* webpackIgnore: true */</span> <span class="token string">\'ignored-module.js\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p><code>webpackIgnore</code>：设置为 true 时，禁用动态导入解析。</p>\n<blockquote class="warning">\n<p>注意：将 <code>webpackIgnore</code> 设置为 <code>true</code> 则不进行代码分割。</p>\n</blockquote>\n<p><code>webpackChunkName</code>: 新 chunk 的名称。 从 webpack 2.6.0 开始，占位符 <code>[index]</code> 和 <code>[request]</code> 分别支持递增的数字或实际的解析文件名。 添加此注释后，将单独的给我们的 chunk 命名为 [my-chunk-name].js 而不是 [id].js。</p>\n<p><code>webpackMode</code>：从 webpack 2.6.0 开始，可以指定以不同的模式解析动态导入。支持以下选项：</p>\n<ul>\n<li><code>\'lazy\'</code> (默认值)：为每个 <code>import()</code> 导入的模块生成一个可延迟加载（lazy-loadable）的 chunk。</li>\n<li><code>\'lazy-once\'</code>：生成一个可以满足所有 <code>import()</code> 调用的单个可延迟加载（lazy-loadable）的 chunk。此 chunk 将在第一次 <code>import()</code> 时调用时获取，随后的 <code>import()</code> 则使用相同的网络响应。注意，这种模式仅在部分动态语句中有意义，例如 <code>import(`./locales/${language}.json`)</code>，其中可能含有多个被请求的模块路径。</li>\n<li><code>\'eager\'</code>：不会生成额外的 chunk。所有的模块都被当前的 chunk 引入，并且没有额外的网络请求。但是仍会返回一个 resolved 状态的 <code>Promise</code>。与静态导入相比，在调用 <code>import()</code> 完成之前，该模块不会被执行。</li>\n<li><code>\'weak\'</code>：尝试加载模块，如果该模块函数已经以其他方式加载，（即另一个 chunk 导入过此模块，或包含模块的脚本被加载）。仍会返回 <code>Promise</code>， 但是只有在客户端上已经有该 chunk 时才会成功解析。如果该模块不可用，则返回 rejected 状态的 <code>Promise</code>，且网络请求永远都不会执行。当需要的 chunks 始终在（嵌入在页面中的）初始请求中手动提供，而不是在应用程序导航在最初没有提供的模块导入的情况下触发，这对于通用渲染（SSR）是非常有用的。</li>\n</ul>\n<p><code>webpackPrefetch</code>：告诉浏览器将来可能需要该资源来进行某些导航跳转。查看指南，了解有关更多信息 <a href="/guides/code-splitting/#prefetchingpreloading-modules">how webpackPrefetch works</a>。</p>\n<p><code>webpackPreload</code>：告诉浏览器在当前导航期间可能需要该资源。 查阅指南，了解有关的更多信息 <a href="/guides/code-splitting/#prefetchingpreloading-modules">how webpackPreload works</a>。</p>\n<blockquote class="tip">\n<p>注意：所有选项都可以像这样组合 <code>/* webpackMode: "lazy-once", webpackChunkName: "all-i18n-data" */</code>。这会按没有花括号的 JSON5 对象去解析。它会被包裹在 JavaScript 对象中，并使用 <a href="https://nodejs.org/dist/latest-v8.x/docs/api/vm.html">node VM</a> 执行。所以你不需要添加花括号。</p>\n</blockquote>\n<p><code>webpackInclude</code>：在导入解析（import resolution）过程中，用于匹配的正则表达式。只有匹配到的模块<strong>才会被打包</strong>。</p>\n<p><code>webpackExclude</code>：在导入解析（import resolution）过程中，用于匹配的正则表达式。所有匹配到的模块<strong>都不会被打包</strong>。</p>\n<blockquote class="tip">\n<p>注意，<code>webpackInclude</code> 和 <code>webpackExclude</code> 不会影响到前缀，例如 <code>./locale</code>。</p>\n</blockquote>\n<p><code>webpackExports</code>: 告诉 webpack 在使用动态导入时，只打包这个模块使用的导出项。它可以减小 chunk 的大小。从 <a href="https://github.com/webpack/webpack/releases/tag/v5.0.0-beta.18">webpack 5.0.0-beta.18</a> 起可用。</p>\n<h2>CommonJS</h2>\n<p>CommonJS 的目标是为浏览器之外的 JavaScript 指定一个生态系统。webpack 支持以下 CommonJS 的方法：</p>\n<h3><code>require</code></h3>\n<pre><code class="hljs language-javascript"><span class="token function">require</span><span class="token punctuation">(</span>dependency<span class="token punctuation">:</span> String<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p>已同步的方式检索其他模块的导出。编译器（compiler）会确保依赖项在输出 bundle 中可用。</p>\n<pre><code class="hljs language-javascript"><span class="token keyword">var</span> $ <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'jquery\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> myModule <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'my-module\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<blockquote class="warning">\n<p>以异步的方式使用，可能不会达到预期效果。</p>\n</blockquote>\n<h3><code>require.resolve</code></h3>\n<pre><code class="hljs language-javascript">require<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>dependency<span class="token punctuation">:</span> String<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p>已同步的方式获取模块的 ID。编译器（compiler）会确保依赖项在最终输出 bundle 中可用。建议将其视为不透明值，只能与 <code>require.cache[id]</code> 或 <code>__webpack_require__(id)</code> 配合使用（最好避免这种用法）。</p>\n<blockquote class="warning">\n<p>模块 ID 的类型可以是 <code>number</code> 或 <code>string</code>，具体取决于 <a href="/configuration/optimization/#optimizationmoduleids"><code>optimization.moduleIds</code></a> 配置。</p>\n</blockquote>\n<p>有关更多模块的信息，详见 <a href="/api/module-variables/#moduleid-commonjs"><code>module.id</code></a>。</p>\n<h3><code>require.cache</code></h3>\n<p>多处引用同一模块，最终只会产生一次模块执行和一次导出。所以，会在运行时（runtime）中会保存一份缓存。删除此缓存，则会产生新的模块执行和新的导出。</p>\n<blockquote class="warning">\n<p>仅在极少数情况下才需要考虑兼容性！</p>\n</blockquote>\n<pre><code class="hljs language-javascript"><span class="token keyword">var</span> d1 <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'dependency\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'dependency\'</span><span class="token punctuation">)</span> <span class="token operator">===</span> d1<span class="token punctuation">;</span>\n<span class="token keyword">delete</span> require<span class="token punctuation">.</span>cache<span class="token punctuation">[</span>require<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">\'dependency\'</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'dependency\'</span><span class="token punctuation">)</span> <span class="token operator">!==</span> d1<span class="token punctuation">;</span></code></pre>\n<pre><code class="hljs language-javascript"><span class="token comment">// in file.js</span>\nrequire<span class="token punctuation">.</span>cache<span class="token punctuation">[</span>module<span class="token punctuation">.</span>id<span class="token punctuation">]</span> <span class="token operator">===</span> module<span class="token punctuation">;</span>\n<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'./file.js\'</span><span class="token punctuation">)</span> <span class="token operator">===</span> module<span class="token punctuation">.</span>exports<span class="token punctuation">;</span>\n<span class="token keyword">delete</span> require<span class="token punctuation">.</span>cache<span class="token punctuation">[</span>module<span class="token punctuation">.</span>id<span class="token punctuation">]</span><span class="token punctuation">;</span>\nrequire<span class="token punctuation">.</span>cache<span class="token punctuation">[</span>module<span class="token punctuation">.</span>id<span class="token punctuation">]</span> <span class="token operator">===</span> undefined<span class="token punctuation">;</span>\n<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'./file.js\'</span><span class="token punctuation">)</span> <span class="token operator">!==</span> module<span class="token punctuation">.</span>exports<span class="token punctuation">;</span> <span class="token comment">// 理论上是不相等的；实际运行中，则会导致堆栈溢出</span>\nrequire<span class="token punctuation">.</span>cache<span class="token punctuation">[</span>module<span class="token punctuation">.</span>id<span class="token punctuation">]</span> <span class="token operator">!==</span> module<span class="token punctuation">;</span></code></pre>\n<h3><code>require.ensure</code></h3>\n<blockquote class="warning">\n<p><code>require.ensure()</code> 是 webpack 特有的，已被 <code>import()</code> 取代。</p>\n</blockquote>\n\x3c!-- eslint-skip --\x3e\n<pre><code class="hljs language-js">require<span class="token punctuation">.</span><span class="token function">ensure</span><span class="token punctuation">(</span>\n  dependencies<span class="token punctuation">:</span> String<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  callback<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>require<span class="token punctuation">)</span><span class="token punctuation">,</span>\n  errorCallback<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">,</span>\n  chunkName<span class="token punctuation">:</span> String\n<span class="token punctuation">)</span></code></pre>\n<p>给定 <code>dependencies</code> 参数，将其对应的文件拆分到一个单独的 bundle 中，此 bundle 会被异步加载。当使用 CommonJS 模块语法时，这是动态加载依赖项的唯一方法。这意味着，可以在模块执行时才允许代码，只有在满足特定条件时才会加载 <code>dependencies</code>。</p>\n<blockquote class="warning">\n<p>这个特性依赖内置的 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"><code>Promise</code></a>。如果你在低版本浏览器中使用 <code>require.ensure</code>，记得使用像 <a href="https://github.com/stefanpenner/es6-promise">es6-promise</a> 或 <a href="https://github.com/taylorhakes/promise-polyfill">promise-polyfill</a> 这样的 polyfill 库，预先填充（shim）<code>Promise</code> 环境。</p>\n</blockquote>\n<pre><code class="hljs language-javascript"><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'normal-dep\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">if</span> <span class="token punctuation">(</span> module<span class="token punctuation">.</span>hot <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  require<span class="token punctuation">.</span><span class="token function">ensure</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'b\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>require<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'c\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n    <span class="token comment">// Do something special...</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n<p>按照上面指定的顺序，<code>require.ensure</code> 支持以下参数：</p>\n<ul>\n<li><code>dependencies</code>：字符串数组，声明 <code>callback</code> 回调函数中所需要的所有模块。</li>\n<li><code>callback</code>：当依赖项加载完成后，webpack 将会执行此函数，<code>require</code> 函数的实现，作为参数传入此函数中。当程序运行需要依赖时，可以使用 <code>require()</code> 来加载依赖。函数体可以使用此参数，来进一步执行 <code>require()</code> 模块。</li>\n<li><code>errorCallback</code>：当 webpack 加载依赖失败时会执行此函数。</li>\n<li><code>chunkName</code>：由 <code>require.ensure</code> 创建的 chunk 的名称。通过将相同 <code>chunkName</code> 传递给不同的 <code>require.ensure</code> 调用，我们可以将其代码合并到一个单独的 chunk 中，从而只产生一个浏览器必须加载的 bundle。</li>\n</ul>\n<blockquote class="warning">\n<p>虽然将 <code>require</code> 的实现作为参数（可以使用任意名称）传递给 <code>callback</code> 函数，例如，<code>require.ensure([], function(request) { request(\'someModule\'); })</code> 则不能被 webpack 静态解析器处理，因此还是使用 <code>require</code> 作为参数名，例如，<code>require.ensure([], function(require) { require(\'someModule\') })</code>。</p>\n</blockquote>\n<h2>AMD</h2>\n<p>AMD（Asynchronous Module Definition）是一种定义了用于编写和加载模块接口的 JavaScript 规范。</p>\n<h3><code>define</code> (通过 factory 方法导出)</h3>\n\x3c!-- eslint-skip --\x3e\n<pre><code class="hljs language-js"><span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span>name<span class="token punctuation">:</span> String<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>dependencies<span class="token punctuation">:</span> String<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span> factoryMethod<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">)</span></code></pre>\n<p>如果提供了 <code>dependencies</code> 参数，就会调用 <code>factoryMethod</code> 方法，并（以相同的顺序）导出每个依赖项。如果未提供 <code>dependencies</code> 参数，调用 <code>factoryMethod</code> 方法时会传入 <code>require</code> , <code>exports</code> 和 <code>module</code>（用于兼容！）。如果此方法返回一个值，则返回值会作为此模块的导出。由编译器（compiler）来确保依赖项在最终输出的 bundle 中可用。</p>\n<blockquote class="warning">\n<p>注意：webpack 会忽略 <code>name</code> 参数。</p>\n</blockquote>\n<pre><code class="hljs language-javascript"><span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'jquery\'</span><span class="token punctuation">,</span> <span class="token string">\'my-module\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>$<span class="token punctuation">,</span> myModule<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// 使用 $ 和 myModule 做一些操作...</span>\n\n  <span class="token comment">// 导出一个函数</span>\n  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// ...</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<blockquote class="warning">\n<p>上面的写法不能在异步函数中使用。</p>\n</blockquote>\n<h3><code>define</code> (通过 value 导出)</h3>\n\x3c!-- eslint-skip --\x3e\n<pre><code class="hljs language-js"><span class="token function">define</span><span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token operator">!</span>Function<span class="token punctuation">)</span></code></pre>\n<p>这种方式只将提供的 <code>value</code> 导出。这里的 <code>value</code> 可以是除函数以外的任何值。</p>\n<pre><code class="hljs language-javascript"><span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  answer<span class="token punctuation">:</span> <span class="token number">42</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<blockquote class="warning">\n<p>上面的写法不能在异步函数中使用。</p>\n</blockquote>\n<h3><code>require</code> (AMD 版本)</h3>\n\x3c!-- eslint-skip --\x3e\n<pre><code class="hljs language-js"><span class="token function">require</span><span class="token punctuation">(</span>dependencies<span class="token punctuation">:</span> String<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>callback<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span></code></pre>\n<p>与 <code>require.ensure</code> 类似，给定 <code>dependencies</code> 参数，将其对应的文件拆分到一个单独的 bundle 中，此 bundle 会被异步加载。然后会调用 <code>callback</code> 回调函数，并传入 <code>dependencies</code> 数组中的每个项导出。</p>\n<blockquote class="warning">\n<p>这个特性依赖内置的 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"><code>Promise</code></a>。如果你在低版本浏览器中使用 <code>require.ensure</code>，记得使用像 <a href="https://github.com/stefanpenner/es6-promise">es6-promise</a> 或 <a href="https://github.com/taylorhakes/promise-polyfill">promise-polyfill</a> 这样的 polyfill 库，预先填充（shim）<code>Promise</code> 环境。</p>\n</blockquote>\n<pre><code class="hljs language-javascript"><span class="token function">require</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'b\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'c\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<blockquote class="warning">\n<p>这里没有提供命名 bundle 名称的选项。</p>\n</blockquote>\n<h2>标签模块(Labeled Modules)</h2>\n<p>webpack 内置的 <code>LabeledModulesPlugin</code> 插件，允许你使用下面的方法导出和导入模块：</p>\n<h3><code>export</code> 标签</h3>\n<p>导出给定的 <code>value</code>。标签可以出现在函数声明或变量声明之前。函数名或变量名是导出值的标识符。</p>\n\x3c!-- eslint-skip --\x3e\n<pre><code class="hljs language-js"><span class="token keyword">export</span><span class="token punctuation">:</span> <span class="token keyword">var</span> answer <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span><span class="token punctuation">:</span> <span class="token keyword">function</span> <span class="token function">method</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// Do something...</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<blockquote class="warning">\n<p>在异步函数中使用，可能不会达到预期的效果。</p>\n</blockquote>\n<h3><code>require</code> 标签</h3>\n<p>在当前作用域下，依赖项的所有导出均可用。<code>require</code> 标签可以放置在一个字符串之前。依赖模块必须使用 <code>export</code> 标签导出值。CommonJS 或 AMD 模块无法通过这种方式使用。</p>\n<p><strong>some-dependency.js</strong></p>\n\x3c!-- eslint-skip --\x3e\n<pre><code class="hljs language-js"><span class="token keyword">export</span><span class="token punctuation">:</span> <span class="token keyword">var</span> answer <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span><span class="token punctuation">:</span> <span class="token keyword">function</span> <span class="token function">method</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// Do something...</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n\x3c!-- eslint-skip --\x3e\n<pre><code class="hljs language-js">require<span class="token punctuation">:</span> <span class="token string">\'some-dependency\'</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>answer<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">method</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<h2>Webpack</h2>\n<p>除了上述模块语法之外，还允许使用一些 webpack 特定的方法：</p>\n<h3><code>require.context</code></h3>\n\x3c!-- eslint-skip --\x3e\n<pre><code class="hljs language-js">require<span class="token punctuation">.</span><span class="token function">context</span><span class="token punctuation">(</span>\n  directory<span class="token punctuation">:</span> String<span class="token punctuation">,</span>\n  includeSubdirs<span class="token punctuation">:</span> Boolean <span class="token comment">/* 可选的，默认值是 true */</span><span class="token punctuation">,</span>\n  filter<span class="token punctuation">:</span> RegExp <span class="token comment">/* 可选的，默认值是 /^\\.\\/.*$/，所有文件 */</span><span class="token punctuation">,</span>\n  mode<span class="token punctuation">:</span> String  <span class="token comment">/* 可选的， \'sync\' | \'eager\' | \'weak\' | \'lazy\' | \'lazy-once\'，默认值是 \'sync\' */</span>\n<span class="token punctuation">)</span></code></pre>\n<p>指定一系列依赖项，通过使用 <code>directory</code> 的路径，以及 <code>includeSubdirs</code> ，<code>filter</code> 选项，进行更细粒度的模块引入，使用 <code>mode</code> 定义加载方式。以此可以很容易的解析模块：</p>\n<pre><code class="hljs language-javascript"><span class="token keyword">var</span> context <span class="token operator">=</span> require<span class="token punctuation">.</span><span class="token function">context</span><span class="token punctuation">(</span><span class="token string">\'components\'</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token regex">/\\.html$/</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> componentA <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">\'componentA\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p>如果 <code>mode</code> 设置为 <code>lazy</code>，基础模块将以异步方式加载：</p>\n<pre><code class="hljs language-javascript"><span class="token keyword">var</span> context <span class="token operator">=</span> require<span class="token punctuation">.</span><span class="token function">context</span><span class="token punctuation">(</span><span class="token string">\'locales\'</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token regex">/\\.json$/</span><span class="token punctuation">,</span> <span class="token string">\'lazy\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token function">context</span><span class="token punctuation">(</span><span class="token string">\'localeA\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>locale <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token comment">// do something with locale</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p><code>mode</code> 的可用模式及说明的完整列表在 <a href="#import-1"><code>import()</code></a> 文档中进行了描述。</p>\n<h3><code>require.include</code></h3>\n\x3c!-- eslint-skip --\x3e\n<pre><code class="hljs language-js">require<span class="token punctuation">.</span><span class="token function">include</span><span class="token punctuation">(</span>dependency<span class="token punctuation">:</span> String<span class="token punctuation">)</span></code></pre>\n<p>引入一个不需要执行的 <code>dependency</code>，这样可以用于优化输出 chunk 中依赖模块的位置。</p>\n<pre><code class="hljs language-javascript">require<span class="token punctuation">.</span><span class="token function">include</span><span class="token punctuation">(</span><span class="token string">\'a\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nrequire<span class="token punctuation">.</span><span class="token function">ensure</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>require<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nrequire<span class="token punctuation">.</span><span class="token function">ensure</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token string">\'c\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>require<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p>这会产生以下输出：</p>\n<ul>\n<li>entry chunk: <code>file.js</code> and <code>a</code></li>\n<li>anonymous chunk: <code>b</code></li>\n<li>anonymous chunk: <code>c</code></li>\n</ul>\n<p>不使用 <code>require.include(\'a\')</code>，输出的两个匿名 chunk 都会有模块 a。</p>\n<h3><code>require.resolveWeak</code></h3>\n<p>与 <code>require.resolve</code> 类似，但是不会把 <code>module</code> 引入到 bundle 中。这就是所谓的“弱（weak）”依赖。</p>\n<pre><code class="hljs language-javascript"><span class="token keyword">if</span><span class="token punctuation">(</span>__webpack_modules__<span class="token punctuation">[</span>require<span class="token punctuation">.</span><span class="token function">resolveWeak</span><span class="token punctuation">(</span><span class="token string">\'module\'</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// 当模块可用时，执行一些操作……</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">if</span><span class="token punctuation">(</span>require<span class="token punctuation">.</span>cache<span class="token punctuation">[</span>require<span class="token punctuation">.</span><span class="token function">resolveWeak</span><span class="token punctuation">(</span><span class="token string">\'module\'</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// 在模块加载完成之前，执行一些操作……</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// 你可以像执行其他 require/import 方法一样，</span>\n<span class="token comment">// 执行动态解析上下文 resolves ("context")。</span>\n<span class="token keyword">const</span> page <span class="token operator">=</span> <span class="token string">\'Foo\'</span><span class="token punctuation">;</span>\n__webpack_modules__<span class="token punctuation">[</span>require<span class="token punctuation">.</span><span class="token function">resolveWeak</span><span class="token punctuation">(</span><span class="token template-string"><span class="token string">`./page/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>page<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span></code></pre>\n<blockquote class="tip">\n<p><code>require.resolveWeak</code> 是<em>通用渲染</em>（服务器端渲染 SSR + 代码分割 Code Splitting）的基础。例如在 <a href="https://github.com/faceyspacey/react-universal-component">react-universal-component</a> 等包中的用法。它允许代码在服务器端和客户端初始页面的加载上同步渲染。它要求手动或以某种方式提供 chunk。它可以在不需要指示应该被打包的情况下引入模块。它与 <code>import()</code> 一起使用，当用户导航触发额外的导入时，它会被接管。</p>\n</blockquote>\n'}}]);