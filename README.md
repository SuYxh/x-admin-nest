<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Installation

```bash
$ pnpm install
```





## minio

### 启动服务

```
docker run -p 9000:9000 -p 9001:9001 --name minio1 \
  -e "MINIO_ROOT_USER=minio" \
  -e "MINIO_ROOT_PASSWORD=minio123" \
  -v /Users/jarvis/Desktop/Y/miniodata:/data \
  minio/minio server /data --console-address ":9001"
```



### 修改 buckets 的权限为 public

```
// 下载并配置 mc：首先，你需要确保安装了 Minio Client。可以从 Minio Client Release 页面下载。
// 配置你的 Minio 服务器
mc alias set myminio http://localhost:9000 minio minio123

// 执行以下命令来设置匿名访问权限：
mc anonymous set public myminio/meng-admin

// 访问上传的文件
http://localhost:9000/meng-admin/程序员十二时辰.png 

```





## docker

### deploy

项目为纯 docker 部署需要 docker version >= 24 启动项目前需要将数据库整理好，sql 文件会放在仓库里

将后端文件打包成 docker 镜像(需要先执行上面的 pnpm install)

```
docker build -t 镜像名称[:tag] ./
```

### 数据库操作

首先进入 mysql 容器

```
docker ps //查看正在启动的容器
docker exec -it 容器id /bin/sh
```

```
mysql -u root -p
use meng_admin
source sql文件(路径)
```

若出现服务器 ip 不能连接数据库问题，执行以下命令

```
CREATE USER 'root'@'%' IDENTIFIED BY 'admin123';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

### nest 后端

需要同步 prisma 结构

首先进入 nest 后端容器

```
docker ps //查看正在启动的容器
docker exec -it 容器id /bin/sh
```

执行

```
prisma migrate dev
```

## Running the app

```
docker-compose up
```

