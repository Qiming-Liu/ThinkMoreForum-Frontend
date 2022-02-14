# ThinkMoreForum-Frontend

## Requirements

* Nodejs-lts = v16.14.0   
* Yarn = v1.22.17  

Run:  
```shell
$ yarn
```
> Installing all the dependencies of project

## [How to Build for Production](https://nextjs.org/docs/deployment)
```shell
$ yarn build
```
> The build is folder `.next`
## How to Run the Production
```shell
$ yarn start
```
> Only folder `.next`, `node_modules` and file `package.json` are required to run production.

## [How to Build Static File only](https://nextjs.org/docs/advanced-features/static-html-export)
```shell
$ yarn build-export
```
> Static export is in `out` folder. The build won't include SSR and API.

## LiveReload Development
``` shell
$ yarn dev
```
