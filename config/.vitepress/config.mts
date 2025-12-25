import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    server: {
      port: 3000,
      host: true
    }
  },
  srcDir: "../markdown",
  rewrites: {
    'notes-vault-main/(.*)': '(.*)'
  },

  title: "Hiu Notes",
  description: "My collection of notes",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }
    ],

    sidebar: [
  {
    "text": "Frontend Development",
    "items": [
      {
        "text": "Angular",
        "collapsed": true,
        "items": [
          {
            "text": "Angular DI",
            "link": "/Angular/Angular DI"
          },
          {
            "text": "Angular Routing",
            "link": "/Angular/Angular Routing"
          },
          {
            "text": "Angular config",
            "link": "/Angular/Angular config"
          },
          {
            "text": "Angular migration to V17",
            "link": "/Angular/Angular migration to V17"
          },
          {
            "text": "App initialization (App bootstrap)",
            "link": "/Angular/App initialization (App bootstrap)"
          },
          {
            "text": "Basic concepts",
            "link": "/Angular/Basic concepts"
          },
          {
            "text": "Change detection",
            "link": "/Angular/Change detection"
          },
          {
            "text": "Forms",
            "link": "/Angular/Forms"
          },
          {
            "text": "Guards",
            "link": "/Angular/Guards"
          },
          {
            "text": "Interceptors",
            "link": "/Angular/Interceptors"
          },
          {
            "text": "Jest Testing Framework",
            "link": "/Angular/Jest Testing Framework"
          },
          {
            "text": "Modules (@NgModule)",
            "link": "/Angular/Modules (@NgModule)"
          },
          {
            "text": "Resolvers",
            "link": "/Angular/Resolvers"
          },
          {
            "text": "RxJS",
            "link": "/Angular/RxJS"
          },
          {
            "text": "Services",
            "link": "/Angular/Services"
          },
          {
            "text": "Signals",
            "link": "/Angular/Signals"
          },
          {
            "text": "Unit testing",
            "link": "/Angular/Unit testing"
          }
        ]
      },
      {
        "text": "React",
        "collapsed": true,
        "items": [
          {
            "text": "Basic concepts",
            "link": "/React/Basic concepts"
          },
          {
            "text": "State Management & Redux",
            "link": "/React/State Management & Redux"
          }
        ]
      },
      {
        "text": "Vue",
        "collapsed": true,
        "items": [
          {
            "text": "Basic concepts",
            "link": "/Vue/Basic concepts"
          },
          {
            "text": "Comparision with other frameworks",
            "link": "/Vue/Comparision with other frameworks"
          },
          {
            "text": "Passing template content",
            "link": "/Vue/Passing template content"
          }
        ]
      }
    ]
  },
  {
    "text": "Programming Languages",
    "items": [
      {
        "text": "CSharp",
        "collapsed": true,
        "items": [
          {
            "text": "ASP.NET Core",
            "link": "/CSharp/ASP.NET Core"
          },
          {
            "text": "App Startup",
            "link": "/CSharp/App Startup"
          },
          {
            "text": "CSharp (ASP.NET) checklist",
            "link": "/CSharp/CSharp (ASP.NET) checklist"
          },
          {
            "text": "Dotnet file structure",
            "link": "/CSharp/Dotnet file structure"
          },
          {
            "text": "Entity Framework",
            "link": "/CSharp/Entity Framework"
          },
          {
            "text": "Setup dotnet project",
            "link": "/CSharp/Setup dotnet project"
          }
        ]
      },
      {
        "text": "Javascript",
        "collapsed": true,
        "items": [
          {
            "text": "How `this` works",
            "link": "/Javascript/How `this` works"
          },
          {
            "text": "JWT - Oauth",
            "link": "/Javascript/JWT - Oauth"
          },
          {
            "text": "Javascript",
            "link": "/Javascript/Javascript"
          },
          {
            "text": "Service worker",
            "link": "/Javascript/Service worker"
          }
        ]
      }
    ]
  },
  {
    "text": "Design & Architecture",
    "items": [
      {
        "text": "Design patterns",
        "collapsed": true,
        "items": [
          {
            "text": "Command Query Responsibility Segragation",
            "link": "/Design patterns/Command Query Responsibility Segragation"
          },
          {
            "text": "Dependency Injection",
            "link": "/Design patterns/Dependency Injection"
          },
          {
            "text": "Micro Frontend",
            "link": "/Design patterns/Micro Frontend"
          },
          {
            "text": "SOLID Principles",
            "link": "/Design patterns/SOLID Principles"
          }
        ]
      }
    ]
  },
  {
    "text": "Algorithms & Data Structures",
    "items": [
      {
        "text": "Algo",
        "collapsed": true,
        "items": [
          {
            "text": "Backtracking",
            "link": "/Algo/Backtracking"
          },
          {
            "text": "Hashmap",
            "link": "/Algo/Hashmap"
          },
          {
            "text": "Linked list",
            "link": "/Algo/Linked list"
          },
          {
            "text": "Math",
            "link": "/Algo/Math"
          },
          {
            "text": "Sliding window",
            "link": "/Algo/Sliding window"
          },
          {
            "text": "Two Pointers",
            "link": "/Algo/Two Pointers"
          }
        ]
      }
    ]
  },
  {
    "text": "Infrastructure & DevOps",
    "items": [
      {
        "text": "AWS",
        "collapsed": true,
        "items": [
          {
            "text": "Module 1",
            "link": "/AWS/Module 1"
          },
          {
            "text": "Quick notes",
            "link": "/AWS/Quick notes"
          }
        ]
      },
      {
        "text": "Docker",
        "collapsed": true,
        "items": [
          {
            "text": "Docker commands",
            "link": "/Docker/Docker commands"
          },
          {
            "text": "Docker files",
            "link": "/Docker/Docker files"
          }
        ]
      }
    ]
  },
  {
    "text": "References & Utilities",
    "items": [
      {
        "text": "Common PR comments",
        "link": "/Common PR comments"
      },
      {
        "text": "Git commands",
        "link": "/Git commands"
      },
      {
        "text": "Random Interview questions",
        "link": "/Random Interview questions"
      },
      {
        "text": "Trunk based development",
        "link": "/Trunk based development"
      },
      {
        "text": "install-chromium.sh",
        "link": "/install-chromium.sh"
      }
    ]
  }
],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
