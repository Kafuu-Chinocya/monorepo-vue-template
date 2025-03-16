import { defineConfig } from 'cz-git'
import fg from 'fast-glob'

// By default Node.js will execute TypeScript files
// that contains only erasable TypeScript syntax.
const RuleConfigSeverity = {
  Disabled: 0,
  Warning: 1,
  Error: 2
}

// scopes
const getPackages = (packagePath: string) =>
  fg.sync('*', { cwd: packagePath, onlyDirectories: true })

const scopes = [...getPackages('packages'), 'docs', 'play', 'internal', 'ci']

export default defineConfig({
  extends: ['@commitlint/config-conventional'],
  rules: {
    /**
     * type[scope]: [function] description
     *      ^^^^^
     */
    'scope-enum': [RuleConfigSeverity.Error, 'always', scopes],
    /**
     * type[scope]: [function] description
     *
     * ^^^^^^^^^^^^^^ empty line.
     * - Something here
     */
    'body-leading-blank': [RuleConfigSeverity.Warning, 'always'],
    /**
     * type[scope]: [function] description
     *
     * - something here
     *
     * ^^^^^^^^^^^^^^
     */
    'footer-leading-blank': [RuleConfigSeverity.Warning, 'always'],
    /**
     * type[scope]: [function] description [No more than 72 characters]
     *      ^^^^^
     */
    'header-max-length': [RuleConfigSeverity.Error, 'always', 72],
    'scope-case': [RuleConfigSeverity.Error, 'always', 'lower-case'],
    'subject-empty': [RuleConfigSeverity.Error, 'never'],
    'subject-full-stop': [RuleConfigSeverity.Error, 'never', '.'],
    'type-case': [RuleConfigSeverity.Error, 'always', 'lower-case'],
    'type-empty': [RuleConfigSeverity.Error, 'never'],
    /**
     * type[scope]: [function] description
     * ^^^^
     */
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      [
        'build', // 修改构建打包文件
        'chore', // 构建过程或辅助工具的变动
        'ci', // 持续集成
        'docs', // 文档（documentation）
        'feat', // 新功能（feature）
        'fix', // 修补 bug
        'perf', // 性能优化
        'refactor', // 重构（即不是新增功能，也不是修改 bug 的代码变动）
        'revert', // 还原以前的提交
        'style', // 格式（不影响代码运行的变动）
        'improvement', // 改进
        'test' // 测试相关
      ]
    ]
  },
  prompt: {
    useEmoji: true,
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: '选择关联issue前缀（可选）:',
      customFooterPrefix: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    types: [
      {
        value: 'build',
        name: 'build:       构建相关 | Changes that affect the build system or external dependencies'
      },
      {
        value: 'chore',
        name: 'chore:       其他修改 | Other changes that do not modify src or test files'
      },
      {
        value: 'ci',
        name: 'ci:          持续集成 | Changes to our CI configuration files and scripts'
      },
      {
        value: 'docs',
        name: 'docs:        文档更新 | Documentation only changes'
      },
      { value: 'feat', name: 'feat:        新增功能 | A new feature' },
      { value: 'fix', name: 'fix:         修复缺陷 | A bug fix' },
      {
        value: 'perf',
        name: 'perf:        性能提升 | A code change that improves performance'
      },
      {
        value: 'refactor',
        name: 'refactor:    代码重构 | A code change that neither fixes a bug nor adds a feature'
      },
      { value: 'revert', name: 'revert:      回退代码 | Revert to a commit' },
      {
        value: 'style',
        name: 'style:       代码格式 | Changes that do not affect the meaning of the code'
      },
      {
        value: 'test',
        name: 'test:        测试相关 | Adding missing tests or correcting existing tests'
      },
      {
        value: 'improvement',
        name: 'improvement: 改进 | Improvement'
      }
    ],
    allowCustomIssuePrefix: false
  }
})
