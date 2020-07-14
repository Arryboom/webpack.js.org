(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{319:function(e,n,d){"use strict";d.r(n),n.default='<p>模块热替换(HMR - hot module replacement)功能会在应用程序运行过程中，替换、添加或删除 <a href="/concepts/modules/">模块</a>，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：</p>\n<ul>\n<li>保留在完全重新加载页面期间丢失的应用程序状态。</li>\n<li>只更新变更内容，以节省宝贵的开发时间。</li>\n<li>在源代码中 CSS/JS 产生修改时，会立刻在浏览器中进行更新，这几乎相当于在浏览器 devtools 直接更改样式。</li>\n</ul>\n<h2>这一切是如何运行的？</h2>\n<p>让我们从一些不同的角度观察，以了解 HMR 的工作原理……</p>\n<h3>在应用程序中</h3>\n<p>通过以下步骤，可以做到在应用程序中置换(swap in and out)模块：</p>\n<ol>\n<li>应用程序要求 HMR runtime 检查更新。</li>\n<li>HMR runtime 异步地下载更新，然后通知应用程序。</li>\n<li>应用程序要求 HMR runtime 应用更新。</li>\n<li>HMR runtime 同步地应用更新。</li>\n</ol>\n<p>你可以设置 HMR，以使此进程自动触发更新，或者你可以选择要求在用户交互时进行更新。</p>\n<h3>在 compiler 中</h3>\n<p>除了普通资源，compiler 需要发出 "update"，将之前的版本更新到新的版本。"update" 由两部分组成：</p>\n<ol>\n<li>更新后的 <a href="/concepts/manifest">manifest</a> (JSON)</li>\n<li>一个或多个 updated chunk (JavaScript)</li>\n</ol>\n<p>manifest 包括新的 compilation hash 和所有的 updated chunk 列表。每个 chunk 都包含着全部更新模块的最新代码（或一个 flag 用于表明此模块需要被移除）。</p>\n<p>compiler 会确保在这些构建之间的模块 ID 和 chunk ID 保持一致。通常将这些 ID 存储在内存中（例如，使用 <a href="/configuration/dev-server/">webpack-dev-server</a> 时），但是也可能会将它们存储在一个 JSON 文件中。</p>\n<h3>在模块中</h3>\n<p>HMR 是可选功能，只会影响包含 HMR 代码的模块。举个例子，通过 <a href="https://github.com/webpack-contrib/style-loader"><code>style-loader</code></a> 为 style 追加补丁。为了运行追加补丁，<code>style-loader</code> 实现了 HMR 接口；当它通过 HMR 接收到更新，它会使用新的样式替换旧的样式。</p>\n<p>类似的，当在一个模块中实现了 HMR 接口，你可以描述出当模块被更新后发生了什么。然而在多数情况下，不需要在每个模块中强行写入 HMR 代码。如果一个模块没有 HMR 处理函数，更新就会冒泡(bubble up)。这意味着某个单独处理函数能够更新整个模块树。如果在模块树的一个单独模块被更新，那么整组依赖模块都会被重新加载。</p>\n<p>有关 <code>module.hot</code> 接口的详细信息，请查看 <a href="/api/hot-module-replacement">HMR API 页面</a>。</p>\n<h3>在 runtime 中</h3>\n<p>这件事情比较有技术性……如果你对其内部不感兴趣，可以随时跳到 <a href="/api/hot-module-replacement">HMR API 页面</a> 或 <a href="/guides/hot-module-replacement">HMR 指南</a>。</p>\n<p>对于模块系统运行时(module system runtime)，会发出额外代码，来跟踪模块 <code>parents</code> 和 <code>children</code> 关系。在管理方面，runtime 支持两个方法 <code>check</code> 和 <code>apply</code>。</p>\n<p><code>check</code> 方法，发送一个 HTTP 请求来更新 manifest。如果请求失败，说明没有可用更新。如果请求成功，会将 updated chunk 列表与当前的 loaded chunk 列表进行比较。每个 loaded chunk 都会下载相应的 updated chunk。当所有更新 chunk 完成下载，runtime 就会切换到 <code>ready</code> 状态。</p>\n<p><code>apply</code> 方法，将所有 updated module 标记为无效。对于每个无效 module，都需要在模块中有一个 update handler，或者在此模块的父级模块中有 update handler。否则，会进行无效标记冒泡，并且父级也会被标记为无效。继续每个冒泡，直到到达应用程序入口起点，或者到达带有 update handler 的 module（以最先到达为准，冒泡停止）。如果它从入口起点开始冒泡，则此过程失败。</p>\n<p>之后，所有无效 module 都会被（通过 dispose handler）处理和解除加载。然后更新当前 hash，并且调用所有 <code>accept</code> handler。runtime 切换回 <code>idle</code> 状态，一切照常继续。</p>\n<h2>起步</h2>\n<p>在开发环境，可以将 HMR 作为 LiveReload 的替代。<a href="/configuration/dev-server/">webpack-dev-server</a> 支持 <code>hot</code> 模式，在试图重新加载整个页面之前，<code>hot</code> 模式会尝试使用 HMR 来更新。更多细节请查看 <a href="/guides/hot-module-replacement">模块热替换</a> 指南。</p>\n<blockquote class="tip">\n<p>与许多其他功能一样，webpack 的强大之处在于它的可定制化。取决于特定项目需求，会有<em>许多方式</em>来配置 HMR。然而，对于多数项目的实现目的来说，<code>webpack-dev-server</code> 都能够很好适应，可以帮助你在项目中快速应用 HMR。</p>\n</blockquote>\n'}}]);