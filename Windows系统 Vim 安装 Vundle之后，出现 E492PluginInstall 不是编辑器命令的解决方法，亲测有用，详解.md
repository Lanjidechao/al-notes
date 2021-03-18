# Windows系统 Vim 安装 Vundle之后，出现 E492:PluginInstall 不是编辑器命令的解决方法，亲测有用，详解

[toc]

**注：可直接跳到 修正 .vimrc 的内容 部分查看解决方法。**

## 发生场景

安装Vim插件管理包之后，想要安装插件的时候，出现  E492:PluginInstall 不是编辑器命令 的错误信息

## 解决方法

### 确认 .vimrc 文件位置

.vimrc是Vim的配置文件，如果你和我一样刚刚开始使用Vim的话，可能没有这个文件。文件的新建位置和方法：

- 在命令台中，先到你个人文件夹的位置： xxx是你的用户名

  ```bash
  cd C:\Users\xxx
  ```

- 然后在这个目录下gvim一个.vimrc文件

  ```bash
  gvim .vimrc
  ```

- 在gvim中，将以下默认内容插入到文件中

  ```vim
  set nocompatible              " 去除VI一致性,必须
  filetype off                  " 必须
  
  " 设置包括vundle和初始化相关的runtime path
  set rtp+=~/.vim/bundle/Vundle.vim
  call vundle#begin()
  " 另一种选择, 指定一个vundle安装插件的路径
  "call vundle#begin('~/some/path/here')
  
  " 让vundle管理插件版本,必须
  Plugin 'VundleVim/Vundle.vim'
  
  " 以下范例用来支持不同格式的插件安装.
  " 请将安装插件的命令放在vundle#begin和vundle#end之间.
  " Github上的插件
  " 格式为 Plugin '用户名/插件仓库名'
  Plugin 'tpope/vim-fugitive'
  " 来自 http://vim-scripts.org/vim/scripts.html 的插件
  " Plugin '插件名称' 实际上是 Plugin 'vim-scripts/插件仓库名' 只是此处的用户名可以省略
  Plugin 'L9'
  " 由Git支持但不再github上的插件仓库 Plugin 'git clone 后面的地址'
  Plugin 'git://git.wincent.com/command-t.git'
  " 本地的Git仓库(例如自己的插件) Plugin 'file:///+本地插件仓库绝对路径'
  Plugin 'file:///home/gmarik/path/to/plugin'
  " 插件在仓库的子目录中.
  " 正确指定路径用以设置runtimepath. 以下范例插件在sparkup/vim目录下
  Plugin 'rstacruz/sparkup', {'rtp': 'vim/'}
  " 安装L9，如果已经安装过这个插件，可利用以下格式避免命名冲突
  Plugin 'ascenator/L9', {'name': 'newL9'}
  
  " 你的所有插件需要在下面这行之前
  call vundle#end()            " 必须
  filetype plugin indent on    " 必须 加载vim自带和插件相应的语法和文件类型相关脚本
  " 忽视插件改变缩进,可以使用以下替代:
  "filetype plugin on
  "
  " 简要帮助文档
  " :PluginList       - 列出所有已配置的插件
  " :PluginInstall    - 安装插件,追加 `!` 用以更新或使用 :PluginUpdate
  " :PluginSearch foo - 搜索 foo ; 追加 `!` 清除本地缓存
  " :PluginClean      - 清除未使用插件,需要确认; 追加 `!` 自动批准移除未使用插件
  "
  " 查阅 :h vundle 获取更多细节和wiki以及FAQ
  " 将你自己对非插件片段放在这行之后
  ```

### 确认 Vundle 的位置

  根据Vundle的文档，你应该已经在 /你的用户名~/.vim/bundle/Vundle.vim 目录下克隆了Vundle的库了，再次确认是不是已经成功克隆到了本地的这个目录下。

### 修正 .vimrc 的内容

在前两步都确认之后，我们现在有以下事实：

- 在你的用户文件夹下有一个名为 **.vimrc** 的文件
- 在你的用户文件夹下有 **\\~\\.vim\bundle\Vundle.vim** 的文件夹

现在我们再次用vim打开 .vimrc 文件。注意文件中下述两行：

```vim
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
```

这个实际上就是在设置命令路径，以及打开vim时运行的命令，发生找不到命令的错误，就是这里有问题。

现在我们需要将相对路径改为绝对路径：（把 *你的用户名文件夹* 替换成你自己的用户名）

```vim
set rtp+=C:\Users\你的用户名文件夹\~\.vim\bundle\Vundle.vim
call vundle#begin('C:\Users\你的用户名文件夹\~\.vim\bundle\Vundle.vim')
```

接着退出插入模式，并且保存并退出。进入vim之后，就能正常使用Vundle的命令了