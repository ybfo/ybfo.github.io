(function () {
  'use strict';

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (s) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[s] || s;
    });
  }

  function parseInline(md) {
    var placeholders = [];
    // Inline code placeholders first
    md = md.replace(/`([^`]+)`/g, function (_, code) {
      var token = '\u0000CODE' + placeholders.length + '\u0000';
      placeholders.push('<code>' + escapeHtml(code) + '</code>');
      return token;
    });

    // Images ![alt](url)
    md = md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, function (_, alt, src) {
      return '<img src="' + escapeHtml(src) + '" alt="' + escapeHtml(alt) + '">';
    });

    // Links [text](url)
    md = md.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_, text, href) {
      return '<a href="' + escapeHtml(href) + '" target="_blank" rel="noopener">' + escapeHtml(text) + '</a>';
    });

    // Bold then italic
    md = md.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    md = md.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Restore code placeholders
    md = md.replace(/\u0000CODE(\d+)\u0000/g, function (_, idx) { return placeholders[Number(idx)] || ''; });
    return md;
  }

  function parseMarkdown(md) {
    var lines = String(md).replace(/\r\n?/g, '\n').split('\n');
    var html = [];
    var i = 0;
    var inCode = false, codeLang = '', codeLines = [];

    function flushParagraph(paragraphLines) {
      if (!paragraphLines.length) return;
      var text = paragraphLines.join(' ').trim();
      if (text) html.push('<p>' + parseInline(escapeHtml(text)) + '</p>');
      paragraphLines.length = 0;
    }

    function readList(startIndex, ordered) {
      var items = [];
      var re = ordered ? /^\s*\d+\.[\t ]+(.*)$/ : /^\s*[-*][\t ]+(.*)$/;
      var idx = startIndex;
      while (idx < lines.length) {
        var m = re.exec(lines[idx]);
        if (!m) break;
        items.push('<li>' + parseInline(escapeHtml(m[1])) + '</li>');
        idx++;
      }
      if (items.length) {
        html.push(ordered ? '<ol>' + items.join('') + '</ol>' : '<ul>' + items.join('') + '</ul>');
      }
      return idx - startIndex;
    }

    var paragraph = [];
    for (i = 0; i < lines.length; i++) {
      var line = lines[i];

      // Fenced code blocks
      var fence = /^```(.*)$/.exec(line);
      if (fence) {
        if (!inCode) {
          flushParagraph(paragraph);
          inCode = true; codeLang = fence[1].trim(); codeLines = [];
        } else {
          html.push('<pre><code class="language-' + escapeHtml(codeLang) + '">' + escapeHtml(codeLines.join('\n')) + '</code></pre>');
          inCode = false; codeLang = ''; codeLines = [];
        }
        continue;
      }
      if (inCode) { codeLines.push(line); continue; }

      // Horizontal rule
      if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) { flushParagraph(paragraph); html.push('<hr>'); continue; }

      // Headings
      var h = /^(#{1,6})\s+(.*)$/.exec(line);
      if (h) { flushParagraph(paragraph); html.push('<h' + h[1].length + '>' + parseInline(escapeHtml(h[2])) + '</h' + h[1].length + '>'); continue; }

      // Blockquote
      var bq = /^>\s?(.*)$/.exec(line);
      if (bq) { flushParagraph(paragraph); html.push('<blockquote>' + parseInline(escapeHtml(bq[1])) + '</blockquote>'); continue; }

      // Lists
      if (/^\s*[-*][\t ]+/.test(line)) { flushParagraph(paragraph); i += readList(i, false); i--; continue; }
      if (/^\s*\d+\.[\t ]+/.test(line)) { flushParagraph(paragraph); i += readList(i, true); i--; continue; }

      // Paragraph or blank
      if (/^\s*$/.test(line)) { flushParagraph(paragraph); } else { paragraph.push(line); }
    }
    flushParagraph(paragraph);
    return html.join('\n');
  }

  function isInBlogDir() {
    return /\/blog\//.test(window.location.pathname);
  }

  function renderBlogIndex() {
    var list = document.getElementById('postsList');
    if (!list) return;
    var base = isInBlogDir() ? '' : 'blog/';
    fetch(base + 'posts.json').then(function (r) { return r.json(); }).then(function (posts) {
      list.innerHTML = '';
      posts.sort(function (a, b) { return String(b.date).localeCompare(String(a.date)); });
      posts.forEach(function (p) {
        var li = document.createElement('li');
        var href = 'post.html?src=' + encodeURIComponent(p.src);
        li.innerHTML = '<time datetime="' + escapeHtml(p.date) + '">' + escapeHtml(p.date) + '</time> — <a href="' + href + '">' + escapeHtml(p.title) + '</a>' + (p.summary ? ' — ' + escapeHtml(p.summary) : '');
        list.appendChild(li);
      });
    }).catch(function () {
      list.innerHTML = '<li>无法加载文章列表。请使用本地服务器预览（例如 python -m http.server）。</li>';
    });
  }

  function getQueryParam(name) {
    var q = new URLSearchParams(window.location.search);
    return q.get(name);
  }

  function renderMarkdownPost() {
    var container = document.getElementById('postContent');
    var titleEl = document.getElementById('postTitle');
    if (!container) return;
    var src = getQueryParam('src');
    if (!src) {
      container.innerHTML = '<p>未提供文章路径参数 src。</p>';
      return;
    }
    var base = isInBlogDir() ? '' : 'blog/';
    fetch(base + src).then(function (r) { return r.text(); }).then(function (text) {
      var firstHeading = /^(?:#)\s+(.+)$/m.exec(text);
      if (firstHeading && titleEl) titleEl.textContent = firstHeading[1].trim();
      container.innerHTML = parseMarkdown(text);
    }).catch(function () {
      container.innerHTML = '<p>无法加载 Markdown 内容。请确保使用本地服务器预览（例如 python -m http.server）。</p>';
    });
  }

  // Expose for reuse
  window.parseMarkdown = parseMarkdown;
  window.renderBlogIndex = renderBlogIndex;
  window.renderMarkdownPost = renderMarkdownPost;

  document.addEventListener('DOMContentLoaded', function () {
    renderBlogIndex();
    renderMarkdownPost();
  });
})();


