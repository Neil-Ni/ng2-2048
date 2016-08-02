# Angular 2 2048


An Angular 2 implementation of [2048](https://github.com/gabrielecirulli/2048).


## Run Locally

```
git clone https://github.com/Neil-Ni/ng2-2048.git
cd ng2-2048
npm install
npm start
```

## Use Docker

Build your own image based on this repository:

```
git clone https://github.com/Neil-Ni/ng2-2048.git
cd ng2-2048
docker build -t ng2-2048:1.0 .
```

Now run your newly created image with:

```
docker run -it --rm --name ng2-2048 -p 5555:5555 ng2-2048:1.0
```

You can stop the running image by `ctrl + c`

## License
[MIT](https://github.com/Neil-Ni/ng2-2048/blob/master/LICENCE)
