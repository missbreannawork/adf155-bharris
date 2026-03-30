/*
  ShipIt Static Demo App
  - A simple client-side JavaScript app with no build step
  - Handles routing and rendering
*/

// ----------------------------
// Mock data
// ----------------------------
// NOTE: You can expand these arrays by adding your own example data.
const users = [
  {
    id: "u1",
    username: "CSS101",
    avatar: "img/avatars/user1.jpg",
    city: "NYC",
    state: "New York",
    tags: [
      { id: "t6", name: "Unit Testing" },
      { id: "t4", name: "React" },
    ],
  },
  {
    id: "u2",
    username: "JSrabbit707",
    avatar: "img/avatars/user2.jpg",
    city: "Vernon",
    state: "California",
    tags: [{ id: "t1", name: "Continuous Integration" }],
  },
  {
    id: "u3",
    username: "silverlion307",
    avatar: "img/avatars/user3.jpg",
    city: "Sioux Falls",
    state: "Arizona",
    tags: [{ id: "t4", name: "React" }],
  },
  {
    id: "u4",
    username: "greentiger995",
    avatar: "img/avatars/user4.jpg",
    city: "Mesa",
    state: "West Virginia",
    tags: [
      { id: "t3", name: "Functional Programming" },
      { id: "t6", name: "Unit Testing" },
    ],
  },
  {
    id: "u5",
    username: "WebDev823",
    avatar: "img/avatars/user5.jpg",
    city: "Irving",
    state: "Louisiana",
    tags: [
      { id: "t5", name: "Redux" },
      { id: "t3", name: "Functional Programming" },
    ],
  },
  {
    id: "u6",
    username: "UpAndRunning829",
    avatar: "img/avatars/user6.jpg",
    city: "Boston",
    state: "Nebraska",
    tags: [{ id: "t4", name: "React" }],
  },
];

const tags = [
  {
    id: "t1",
    name: "Continuous Integration",
    icon: "fa-adjust",
    count: 382,
    lastPostAt: "2020-04-01T19:31:26+0000",
  },
  {
    id: "t2",
    name: "es6",
    icon: "fa-book",
    count: 238,
    lastPostAt: "2020-04-02T19:31:26+0000",
  },
  {
    id: "t3",
    name: "Functional Programming",
    icon: "fa-brain",
    count: 423,
    lastPostAt: "2020-03-31T19:31:26+0000",
  },
  {
    id: "t4",
    name: "React",
    icon: "fa-atom",
    count: 585,
    lastPostAt: "2020-03-23T19:31:26+0000",
  },
  {
    id: "t5",
    name: "Redux",
    icon: "fa-atlas",
    count: 383,
    lastPostAt: "2020-02-26T19:31:26+0000",
  },
  {
    id: "t6",
    name: "Unit Testing",
    icon: "fa-bug",
    count: 487,
    lastPostAt: "2020-03-27T19:31:26+0000",
  },
];

const posts = [
  {
    id: "p1",
    title: "How to add redux to a react project",
    content:
      "# Redux Basics\n- Redux Docs\n- Normalizing Redux\n\nTry writing your first reducer and connect it to a store.",
    createdAt: "2020-04-02T19:31:26+0000",
    tags: ["t4", "t5"],
    userId: "u1",
    commentCount: 2,
    totalVotes: 1,
  },
  {
    id: "p2",
    title: "Routing in Express",
    content:
      "# Express Routing\n- app.get\n- app.post\n\nKeep routes organized with small route files.",
    createdAt: "2020-03-31T19:31:26+0000",
    tags: ["t2", "t3"],
    userId: "u2",
    commentCount: 13,
    totalVotes: 1,
  },
  {
    id: "p3",
    title: "How do you destructure an array?",
    content:
      "# Destructuring\n- Use [a, b] = array\n- Works with nested arrays\n\nTry destructuring in a for loop.",
    createdAt: "2020-03-23T19:31:26+0000",
    tags: ["t2"],
    userId: "u1",
    commentCount: 23,
    totalVotes: 1,
  },
  {
    id: "p5",
    title: "CI checks that keep PRs healthy",
    content:
      "# CI Checks\n- Lint before tests\n- Run tests in parallel\n\nKeep feedback fast and focused.",
    createdAt: "2020-04-03T12:10:00+0000",
    tags: ["t1"],
    userId: "u1",
    commentCount: 3,
    totalVotes: 4,
  },
  {
    id: "p4",
    title: "Set up CI for small teams",
    content:
      "# Continuous Integration\n- Start with linting\n- Add tests\n\nCI is most helpful when it runs fast.",
    createdAt: "2020-04-01T19:31:26+0000",
    tags: ["t1"],
    userId: "u1",
    commentCount: 4,
    totalVotes: 7,
  },
];

const initialComments = {
  p1: [
    { id: "c1", user: "JSrabbit707", text: "Thanks for the helpful links!" },
    { id: "c2", user: "UpAndRunning829", text: "These are awesome." },
  ],
  p2: [{ id: "c3", user: "greentiger995", text: "Good overview." }],
};

// ----------------------------
// App state
// ----------------------------
const state = {
  loggedIn: true,
  currentUserId: "u1",
  activeTab: "popular",
  watchingTagIds: ["t1", "t2", "t4"],
  comments: JSON.parse(JSON.stringify(initialComments)),
};

// ----------------------------
// Utilities
// ----------------------------
const view = document.getElementById("view");
const sessionActions = document.getElementById("session-actions");
const watchedTagsEl = document.getElementById("watched-tags");
const dashboardArea = document.getElementById("dashboard-area");

function qs(selector) {
  return document.querySelector(selector);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderMarkdown(text) {
  // Minimal markdown (headings + unordered lists)
  const lines = escapeHtml(text).split("\n");
  let html = "";
  let inList = false;

  lines.forEach((line) => {
    if (line.startsWith("# ")) {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      html += `<h2>${line.slice(2)}</h2>`;
      return;
    }

    if (line.startsWith("- ")) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${line.slice(2)}</li>`;
      return;
    }

    if (line.trim() === "") {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      return;
    }

    if (inList) {
      html += "</ul>";
      inList = false;
    }
    html += `<p>${line}</p>`;
  });

  if (inList) {
    html += "</ul>";
  }
  return html;
}

function formatDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleDateString();
}

function findUser(userId) {
  return users.find((user) => user.id === userId) || users[0];
}

function findTag(tagId) {
  return tags.find((tag) => tag.id === tagId) || tags[0];
}

function findPost(postId) {
  return posts.find((post) => post.id === postId) || posts[0];
}

function setActiveNav(path) {
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const target = link.getAttribute("data-nav");
    if (target === path) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// ----------------------------
// Layout helpers
// ----------------------------
function renderSessionActions() {
  if (state.loggedIn) {
    const user = findUser(state.currentUserId);
    sessionActions.innerHTML = `
      <!-- Logged-in actions -->
      <a class="link-button" href="#/create-post">New Post</a>
      <div class="menu">
        <button class="button ghost" id="user-menu-btn">
          <img src="${user.avatar}" alt="${user.username}" style="width:24px;height:24px;border-radius:50%;" />
          <span>${user.username}</span>
        </button>
        <div class="menu-panel" id="user-menu-panel" hidden>
          <a href="#/users/${user.id}">Profile</a>
          <a href="#/settings">Settings</a>
          <button class="link-button" id="logout-btn">Logout</button>
        </div>
      </div>
    `;

    const menuBtn = qs("#user-menu-btn");
    const menuPanel = qs("#user-menu-panel");
    const logoutBtn = qs("#logout-btn");

    menuBtn.addEventListener("click", () => {
      menuPanel.hidden = !menuPanel.hidden;
    });

    logoutBtn.addEventListener("click", () => {
      state.loggedIn = false;
      window.location.hash = "#/";
      renderApp();
    });
  } else {
    sessionActions.innerHTML = `
      <!-- Logged-out actions -->
      <a class="link-button ghost" href="#/login">Login</a>
      <a class="link-button" href="#/join">Join Now</a>
    `;
  }
}

function renderWatchedTags() {
  const watched = tags.filter((tag) => state.watchingTagIds.includes(tag.id));
  watchedTagsEl.innerHTML = watched
    .map(
      (tag) =>
        `<li><a href="#/tags/${tag.id}" data-nav="/tags/${tag.id}">${tag.name}</a></li>`,
    )
    .join("");

  dashboardArea.style.display = state.loggedIn ? "block" : "none";
}

// ----------------------------
// Page renderers
// ----------------------------
function renderHome() {
  const popular = posts.slice(0, 2);
  const watching = posts.filter((post) =>
    post.tags.some((tagId) => state.watchingTagIds.includes(tagId)),
  );
  const newest = posts.slice().reverse();
  const top = posts.slice().sort((a, b) => b.totalVotes - a.totalVotes);

  const tabs = {
    watching,
    popular,
    new: newest,
    top,
  };

  const selected = tabs[state.activeTab] || popular;

  view.innerHTML = `
    <!-- Home page: tabs + post list -->
    <h1 class="section-title">Top Posts</h1>
    <div class="tabs" id="home-tabs">
      ${state.loggedIn ? `<button class="tab" data-tab="watching"><span style="font-size: 1.5em">🧐</span> Watching</button>` : ""}
      <button class="tab" data-tab="popular"><span style="font-size: 1.5em">🔥</span> Popular</button>
      <button class="tab" data-tab="new"><span style="font-size: 1.5em">✨</span> New</button>
      <button class="tab" data-tab="top"><span style="font-size: 1.5em">🏆</span> Top</button>
    </div>
    <div class="post-list">${renderPostList(selected)}</div>
  `;

  // Tab interaction
  document.querySelectorAll("#home-tabs .tab").forEach((btn) => {
    const tab = btn.getAttribute("data-tab");
    if (tab === state.activeTab) {
      btn.classList.add("active");
    }
    btn.addEventListener("click", () => {
      state.activeTab = tab;
      renderApp();
    });
  });

  // Setup vote listeners
  setupVoteListeners();
}

function renderPostList(list) {
  return list
    .map((post) => {
      const user = findUser(post.userId);
      return `
        <article class="card" style="display: flex; flex-direction: column;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
            <div style="flex: 1;">
              <a href="#/posts/${post.id}" class="section-title" style="font-size:20px;">
                ${post.title}
              </a>
              <div class="post-meta">
                <span>by ${user.username}</span>
                <span>${formatDate(post.createdAt)}</span>
                <span>${post.commentCount} comments</span>
              </div>
            </div>
            <div style="display: flex; gap: 12px; align-items: center; flex-shrink: 0;">
              <div style="display: flex; gap: 2px; align-items: center;">
                <button class="vote-btn-up" data-post-id="${post.id}" style="background: none; border: none; color: var(--disabled); cursor: pointer; font-size: 16px; padding: 0 2px;" title="Upvote">⬆️</button>
                <span class="vote-count" data-post-id="${post.id}" style="font-size: 13px; color: var(--disabled); min-width: 12px; text-align: center;">${post.totalVotes}</span>
                <button class="vote-btn-down" data-post-id="${post.id}" style="background: none; border: none; color: var(--disabled); cursor: pointer; font-size: 16px; padding: 0 2px;" title="Downvote">⬇️</button>
              </div>
              <a href="#/posts/${post.id}" style="display: flex; align-items: center; gap: 4px; text-decoration: none; color: var(--disabled); font-size: 13px;">
                <span style="font-size: 16px;">💬</span>
                <span>${post.commentCount}</span>
              </a>
            </div>
          </div>
          <div style="margin-top: 12px;">
            ${post.tags
              .map((tagId) => {
                const tag = findTag(tagId);
                return `<span class="tag-pill">#${tag.name}</span>`;
              })
              .join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function setupVoteListeners() {
  document.querySelectorAll(".vote-btn-up").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const postId = btn.getAttribute("data-post-id");
      const post = findPost(postId);
      if (post) {
        post.totalVotes++;
        renderApp();
      }
    });
  });

  document.querySelectorAll(".vote-btn-down").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const postId = btn.getAttribute("data-post-id");
      const post = findPost(postId);
      if (post && post.totalVotes > 0) {
        post.totalVotes--;
        renderApp();
      }
    });
  });
}

function renderPost() {
  const postId = getRouteParams().postId;
  const post = findPost(postId);
  const user = findUser(post.userId);
  const commentList = state.comments[post.id] || [];

  view.innerHTML = `
    <!-- Post page: content + comments -->
    <article class="card">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 16px;">
        <div style="flex: 1;">
          <h1 class="section-title">${post.title}</h1>
          <div class="post-meta">
            <span>by ${user.username}</span>
            <span>${formatDate(post.createdAt)}</span>
            <span>${post.totalVotes} votes</span>
          </div>
        </div>
        <div style="display: flex; gap: 12px; align-items: center; flex-shrink: 0;">
          <div style="display: flex; gap: 2px; align-items: center;">
            <button class="vote-btn-up" data-post-id="${post.id}" style="background: none; border: none; color: var(--disabled); cursor: pointer; font-size: 18px; padding: 0 2px;" title="Upvote">⬆️</button>
            <span class="vote-count" data-post-id="${post.id}" style="font-size: 14px; color: var(--disabled); min-width: 14px; text-align: center;">${post.totalVotes}</span>
            <button class="vote-btn-down" data-post-id="${post.id}" style="background: none; border: none; color: var(--disabled); cursor: pointer; font-size: 18px; padding: 0 2px;" title="Downvote">⬇️</button>
          </div>
          <div style="display: flex; align-items: center; gap: 4px; color: var(--disabled); font-size: 14px;">
            <span style="font-size: 18px;">💬</span>
            <span>${post.commentCount}</span>
          </div>
        </div>
      </div>
      <div class="markdown">
        ${renderMarkdown(post.content)}
      </div>
    </article>

    ${state.loggedIn && state.currentUserId === post.userId ? `<div style="margin:12px 0;"><a class="link-button" href="#/posts/edit/${post.id}">Edit</a></div>` : ""}

    <h2 class="section-title" style="font-size:22px; margin-top:24px;">Comments</h2>
    ${state.loggedIn ? renderCommentForm(post.id) : renderLoginPrompt()}
    <div class="comment-list">
      ${commentList
        .map(
          (comment) => `
        <div class="card">
          <strong>${comment.user}</strong>
          <p>${escapeHtml(comment.text)}</p>
        </div>
      `,
        )
        .join("")}
    </div>
  `;

  if (state.loggedIn) {
    const form = qs("#comment-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = qs("#comment-input");
      const text = input.value.trim();
      if (!text) return;
      const next = state.comments[post.id] || [];
      next.push({ id: `c-${Date.now()}`, user: "demoUser", text });
      state.comments[post.id] = next;
      input.value = "";
      renderApp();
    });
  }

  // Setup vote listeners
  setupVoteListeners();
}

function renderCommentForm() {
  return `
    <form class="form" id="comment-form">
      <label for="comment-input">Add a comment</label>
      <textarea id="comment-input" placeholder="Write your comment..."></textarea>
      <button class="button" type="submit">Post Comment</button>
    </form>
  `;
}

function renderLoginPrompt() {
  return `
    <p>
      <a href="#/login">Login</a> or <a href="#/join">Sign up</a> to create a comment.
    </p>
  `;
}

function renderPostAdmin() {
  const userPosts = posts.filter((post) => post.userId === state.currentUserId);
  view.innerHTML = `
    <!-- Post admin: list of posts for the current user -->
    <h1 class="section-title">Your Posts</h1>
    <div class="post-list">
      ${userPosts
        .map(
          (post) => `
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 10px;">
            <strong>${post.title}</strong>
            <div style="display: flex; gap: 10px; align-items: center; flex-shrink: 0; font-size: 13px; color: var(--disabled);">
              <div style="display: flex; gap: 2px; align-items: center;">
                <button class="vote-btn-up" data-post-id="${post.id}" style="background: none; border: none; color: var(--disabled); cursor: pointer; font-size: 14px; padding: 0 2px;">⬆️</button>
                <span class="vote-count" data-post-id="${post.id}" style="min-width: 12px; text-align: center;">${post.totalVotes}</span>
                <button class="vote-btn-down" data-post-id="${post.id}" style="background: none; border: none; color: var(--disabled); cursor: pointer; font-size: 14px; padding: 0 2px;">⬇️</button>
              </div>
              <div style="display: flex; gap: 3px; align-items: center;">
                <span>💬</span>
                <span>${post.commentCount}</span>
              </div>
            </div>
          </div>
          <div style="margin-top:10px;">
            <a class="link-button ghost" href="#/posts/${post.id}">View</a>
            <a class="link-button" href="#/posts/edit/${post.id}">Edit</a>
            <button class="link-button ghost" data-delete="${post.id}">Delete</button>
          </div>
        </div>
      `,
        )
        .join("")}
    </div>
  `;

  document.querySelectorAll("[data-delete]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-delete");
      const index = posts.findIndex((post) => post.id === id);
      if (index >= 0) {
        posts.splice(index, 1);
        renderApp();
      }
    });
  });

  // Setup vote listeners
  setupVoteListeners();
}

function renderPostForm() {
  const { editPostId } = getRouteParams();
  const editing = Boolean(editPostId);
  const post = editing ? findPost(editPostId) : null;

  view.innerHTML = `
    <!-- Post form: create or edit -->
    <h1 class="section-title">${editing ? "Edit Post" : "Create a New Post"}</h1>
    <form class="form" id="post-form">
      <label for="post-title">Title</label>
      <input id="post-title" value="${post ? post.title : ""}" />

      <label for="post-content">Content (markdown-ish)</label>
      <textarea id="post-content">${post ? escapeHtml(post.content) : ""}</textarea>

      <label for="post-tags">Tags (comma-separated)</label>
      <input id="post-tags" value="${post ? post.tags.map((t) => findTag(t).name).join(", ") : ""}" />

      <button class="button" type="submit">Save Post</button>
    </form>
  `;

  qs("#post-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = qs("#post-title").value.trim();
    const content = qs("#post-content").value.trim();
    const tagNames = qs("#post-tags")
      .value.split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const tagIds = tagNames
      .map((name) =>
        tags.find((t) => t.name.toLowerCase() === name.toLowerCase()),
      )
      .filter(Boolean)
      .map((tag) => tag.id);

    if (!title || !content) return;

    if (editing && post) {
      post.title = title;
      post.content = content;
      post.tags = tagIds;
    } else {
      posts.unshift({
        id: `p-${Date.now()}`,
        title,
        content,
        createdAt: new Date().toISOString(),
        tags: tagIds,
        userId: state.currentUserId,
        commentCount: 0,
        totalVotes: 0,
      });
    }

    window.location.hash = "#/posts";
  });
}

function renderUsers() {
  view.innerHTML = `
    <!-- Users page: filter + list -->
    <div class="search-bar">
      <span aria-hidden="true">&#128269;</span>
      <input id="user-filter" placeholder="filter users" />
    </div>
    <div id="user-list" class="post-list"></div>
  `;

  const list = qs("#user-list");
  const input = qs("#user-filter");

  function draw(filter = "") {
    const term = filter.toLowerCase();
    const filtered = users.filter((user) =>
      [user.username, user.city, user.state].some((v) =>
        v.toLowerCase().includes(term),
      ),
    );

    list.innerHTML = filtered
      .map(
        (user) => `
        <div class="card" style="display:flex;gap:12px;align-items:center;">
          <img class="profile-avatar" src="${user.avatar}" alt="${user.username}" style="width:48px;height:48px;" />
          <div>
            <a href="#/users/${user.id}"><strong>${user.username}</strong></a>
            <div class="sub-title">${user.city}, ${user.state}</div>
            <div>
              ${user.tags.map((tag) => `<span class="tag-pill">${tag.name}</span>`).join("")}
            </div>
          </div>
        </div>
      `,
      )
      .join("");
  }

  input.addEventListener("input", () => draw(input.value));
  draw();
}

function renderProfile() {
  const { userId } = getRouteParams();
  const localUser =
    userId === "me" ? findUser(state.currentUserId) : findUser(userId);

  view.innerHTML = `
    <!-- Profile page: user card + posts -->
    <div class="profile-card" id="profile-card">
      <img class="profile-avatar" src="${localUser.avatar}" alt="${localUser.username}" />
      <h1 class="section-title">${localUser.username}</h1>
      <p class="sub-title">${localUser.city}, ${localUser.state}</p>

      <div class="toggle-row">
        <span class="badge">RandomUser API demo (fetch disabled)</span>
      </div>

      <div class="profile-tags">
        ${localUser.tags.map((tag) => `<span class="tag-pill">#${tag.name}</span>`).join("")}
      </div>
    </div>

    <h2 class="section-title" style="font-size:22px;">${localUser.username}'s Posts</h2>
    <div class="post-list">
      ${renderPostList(posts.filter((post) => post.userId === localUser.id))}
    </div>
  `;

  // Setup vote listeners
  setupVoteListeners();
}

function renderTags() {
  view.innerHTML = `
    <!-- Tags page: filter + list -->
    <div class="search-bar">
      <span aria-hidden="true">&#128269;</span>
      <input id="tag-filter" placeholder="filter tags" />
    </div>
    <div id="tag-list" class="post-list"></div>
  `;

  const list = qs("#tag-list");
  const input = qs("#tag-filter");

  function draw(filter = "") {
    const term = filter.toLowerCase();
    const filtered = tags.filter((tag) =>
      tag.name.toLowerCase().includes(term),
    );
    list.innerHTML = filtered
      .map(
        (tag) => `
        <div class="card" style="display:flex;gap:12px;align-items:center;">
          <div class="badge">${tag.count} posts</div>
          <div>
            <a href="#/tags/${tag.id}"><strong>${tag.name}</strong></a>
            <div class="sub-title">Last post: ${formatDate(tag.lastPostAt)}</div>
          </div>
        </div>
      `,
      )
      .join("");
  }

  input.addEventListener("input", () => draw(input.value));
  draw();
}

function renderTag() {
  const { tagId } = getRouteParams();
  const tag = findTag(tagId);
  const alreadyWatching = state.watchingTagIds.includes(tag.id);
  const taggedPosts = posts.filter((post) => post.tags.includes(tag.id));

  view.innerHTML = `
    <!-- Tag detail page: watch toggle + posts -->
    <h1 class="section-title">
      ${tag.name}
      <button class="button ${alreadyWatching ? "secondary" : ""}" id="watch-btn">
        ${alreadyWatching ? "Stop Watching" : "Watch Tag"}
      </button>
    </h1>
    <div class="post-list">${renderPostList(taggedPosts)}</div>
  `;

  qs("#watch-btn").addEventListener("click", () => {
    if (alreadyWatching) {
      state.watchingTagIds = state.watchingTagIds.filter((id) => id !== tag.id);
    } else {
      state.watchingTagIds.push(tag.id);
    }
    renderApp();
  });

  // Setup vote listeners
  setupVoteListeners();
}

function renderLogin() {
  view.innerHTML = `
    <!-- Login page: demo form -->
    <form class="form" id="login-form">
      <h1 class="section-title">Login</h1>
      <label for="login-username">Username</label>
      <input id="login-username" />

      <label for="login-password">Password</label>
      <input id="login-password" type="password" />

      <button class="button" type="submit">Login</button>
    </form>
  `;

  qs("#login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    state.loggedIn = true;
    window.location.hash = "#/";
  });
}

function renderJoin() {
  view.innerHTML = `
    <!-- Join page: demo form (avatar via URL) -->
    <form class="form" id="join-form">
      <h1 class="section-title">Join ShipIt</h1>
      <label for="join-avatar">Avatar URL</label>
      <input id="join-avatar" placeholder="https://..." />

      <label for="join-username">Username</label>
      <input id="join-username" />

      <label for="join-password">Password</label>
      <input id="join-password" type="password" />

      <label for="join-city">City</label>
      <input id="join-city" />

      <label for="join-state">State</label>
      <input id="join-state" />

      <button class="button" type="submit">Join</button>
    </form>
  `;

  qs("#join-form").addEventListener("submit", (e) => {
    e.preventDefault();
    state.loggedIn = true;
    window.location.hash = "#/";
  });
}

function renderSettings() {
  const user = findUser(state.currentUserId);
  view.innerHTML = `
    <!-- Settings page: demo form -->
    <form class="form" id="settings-form">
      <h1 class="section-title">Your Settings</h1>
      <label for="settings-avatar">Avatar URL</label>
      <input id="settings-avatar" value="${user.avatar}" />

      <label for="settings-username">Username</label>
      <input id="settings-username" value="${user.username}" />

      <label for="settings-city">City</label>
      <input id="settings-city" value="${user.city}" />

      <label for="settings-state">State</label>
      <input id="settings-state" value="${user.state}" />

      <button class="button" type="submit">Save Settings</button>
    </form>
  `;

  qs("#settings-form").addEventListener("submit", (e) => {
    e.preventDefault();
    user.avatar = qs("#settings-avatar").value.trim() || user.avatar;
    user.username = qs("#settings-username").value.trim() || user.username;
    user.city = qs("#settings-city").value.trim() || user.city;
    user.state = qs("#settings-state").value.trim() || user.state;
    renderApp();
  });
}

// ----------------------------
// Simple hash router
// ----------------------------
function getPath() {
  const hash = window.location.hash || "#/";
  return hash.replace(/^#/, "");
}

function getRouteParams() {
  const path = getPath();
  const parts = path.split("/").filter(Boolean);
  const isEditPost = parts[0] === "posts" && parts[1] === "edit" && parts[2];
  return {
    postId:
      parts[0] === "posts" && parts[1] && parts[1] !== "edit" ? parts[1] : null,
    editPostId: isEditPost ? parts[2] : null,
    userId: parts[0] === "users" && parts[1] ? parts[1] : null,
    tagId: parts[0] === "tags" && parts[1] ? parts[1] : null,
  };
}

function renderNotFound() {
  view.innerHTML = `
    <h1 class="section-title">Page Not Found</h1>
    <p>Try one of the menu links to get back on track.</p>
  `;
}

function renderApp() {
  renderSessionActions();
  renderWatchedTags();

  const path = getPath();

  if (path === "/") {
    setActiveNav("/");
    renderHome();
    return;
  }

  if (path === "/create-post") {
    setActiveNav("/");
    renderPostForm();
    return;
  }

  if (path === "/settings") {
    setActiveNav("/settings");
    renderSettings();
    return;
  }

  if (path === "/login") {
    setActiveNav("/");
    renderLogin();
    return;
  }

  if (path === "/join") {
    setActiveNav("/");
    renderJoin();
    return;
  }

  if (path === "/posts") {
    setActiveNav("/posts");
    renderPostAdmin();
    return;
  }

  if (path.startsWith("/posts/edit/")) {
    setActiveNav("/posts");
    renderPostForm();
    return;
  }

  if (path.startsWith("/posts/")) {
    setActiveNav("/posts");
    renderPost();
    return;
  }

  if (path === "/users") {
    setActiveNav("/users");
    renderUsers();
    return;
  }

  if (path === "/users/me") {
    setActiveNav("/users/me");
    renderProfile();
    return;
  }

  if (path.startsWith("/users/")) {
    setActiveNav("/users");
    renderProfile();
    return;
  }

  if (path === "/tags") {
    setActiveNav("/tags");
    renderTags();
    return;
  }

  if (path.startsWith("/tags/")) {
    const { tagId } = getRouteParams();
    setActiveNav(`/tags/${tagId}`);
    renderTag();
    return;
  }

  renderNotFound();
}

// ----------------------------
// Boot
// ----------------------------
window.addEventListener("hashchange", renderApp);
window.addEventListener("DOMContentLoaded", renderApp);
