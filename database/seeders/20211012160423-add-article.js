'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert('articles', [
      {
        title: 'ES6 补充',
        cover: 'https://dtcos-1258203853.cos.ap-shenzhen-fsi.myqcloud.com/images/javascript.jpg',
        author: 1,
        content: '# 1. 块级作用域\n' +
          '​\tES6之前没有块级作用域，ES5的var没有块级作用域的概念，只有function有作用域的概念，ES6的let、const引入了块级作用域。\n' +
          '​\tES5之前if和for都没有作用域，所以很多时候需要使用function的作用域，比如闭包。\n' +
          '## 1.1. 什么是变量作用域\n' +
          '​\t变量在什么范围内可用，类似Java的全局变量和局部变量的概念，全局变量，全局都可用，局部变量只在范围内可用。ES5之前的var是没有块级作用域的概念，使用var声明的变量就是全局的。\n' +
          '```js\n' +
          '{\n' +
          '\tvar name = \'zzz\';\n' +
          '\tconsole.log(name);\n' +
          '}\n' +
          'console.log(name);\n' +
          '```\n' +
          '​\t上述代码中{}外的`console.log(name)`可以获取到name值并打印出来，用var声明赋值的变量是全局变量，没有块级作用域。\n' +
          '## 1.2. 没有块级作用域造成的问题\n' +
          '### if块级\n' +
          '```javascript\n' +
          'var func(){\n' +
          '    if(true){\n' +
          '\tvar name = \'zzz\';\n' +
          '\tfunc = function (){\n' +
          '\t\tconsole.log(name);\n' +
          '\t}\n' +
          '\tfunc();\n' +
          '  }\n' +
          '}\n' +
          'name = \'ttt\';\n' +
          'func();\n' +
          'console.log(name);\n' +
          '```\n' +
          '​\t代码输出结果为`\'zzz\',\'ttt\',\'ttt\'`，第一次调用func()，此时name=‘zzz’，在if块外将name置成‘ttt’，此时生效了，if没有块级作用域。\n' +
          '### for块级\n' +
          '​\t定义五个按钮，增加事件，点击哪个按钮打印“第哪个按钮被点击了”。\n' +
          '```html\n' +
          '<!DOCTYPE html>\n' +
          '<html lang="en">\n' +
          '<head>\n' +
          '  <meta charset="UTF-8">\n' +
          '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
          '  <meta http-equiv="X-UA-Compatible" content="ie=edge">\n' +
          '  <title>块级作用域</title>\n' +
          '</head>\n' +
          '<body>\n' +
          '  <button>按钮1</button>\n' +
          '  <button>按钮2</button>\n' +
          '  <button>按钮3</button>\n' +
          '  <button>按钮4</button>\n' +
          '  <button>按钮5</button>\n' +
          '  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js">    </script>\n' +
          '    <script>\n' +
          '      // 3.没有块级作用域引起的问题:for块级\n' +
          '      var btns = document.getElementsByTagName("button");\n' +
          '      for (var i = 0; i < btns.length; i++) {\n' +
          '        btns[i].addEventListener(\'click\',function (param) {\n' +
          '        console.log("第"+i+"个按钮被点击了");\n' +
          '        });\n' +
          '      }\n' +
          '    </script>\n' +
          '</body>\n' +
          '</html>\n' +
          '```\n' +
          '​\tfor块级中使用`var`声明变量i时，是全局变量，点击任意按钮结果都是“第五个按钮被点击了”。说明在执行`btns[i].addEventListener(\'click\',function())`时，for块级循环已经走完，此时`i=5`，所有添加的事件的i都是5。\n' +
          '​\t改造上述代码，将for循环改造，由于函数有作用域，使用闭包能解决上述问题。\n' +
          '```javascript\n' +
          '      // 使用闭包,函数有作用域\n' +
          '      for (var i = 0; i < btns.length; i++) {\n' +
          '        (function (i) {\n' +
          '          btns[i].addEventListener(\'click\',function (param) {\n' +
          '            console.log("第"+i+"个按钮被点击了");\n' +
          '          })\n' +
          '        })(i);\n' +
          '      }\n' +
          '```\n' +
          '​\t结果如图所示，借用函数的作用域解决块级作用域的问题，因为有块级作用域，每次添加的i都是当前i。\n' +
          '![](https://cdn.jsdelivr.net/gh/krislinzhao/IMGcloud/img/20200506210027.png)\n' +
          '​\t在ES6中使用let/const解决块级作用域问题，let和const有块级作用域，const定义常量，在for块级中使用let解决块级作用域问题。\n' +
          '```javascript\n' +
          '      // ES6使用let/const\n' +
          '      const btns = document.getElementsByTagName("button");\n' +
          '      for (let i = 0; i < btns.length; i++) {\n' +
          '        btns[i].addEventListener(\'click\',function (param) {\n' +
          '          console.log("第"+i+"个按钮被点击了");\n' +
          '        })\n' +
          '      }\n' +
          '```\n' +
          '​\t结果和使用闭包解决一致。\n' +
          '# 2. const的使用\n' +
          '1.const用来定义常量，赋值之后不能再赋值，再次赋值会报错。\n' +
          '```javascript\n' +
          '    <script>\n' +
          '        //1.定义常量，赋值后不能再赋值，在赋值报错\n' +
          '        const count = 1\n' +
          '        // count = 2\n' +
          '    </script>\n' +
          '```\n' +
          '​\t2.const不能只声明不赋值，会报错。\n' +
          '```javascript\n' +
          '    <script>\n' +
          '        //2.只声明不赋值，必须赋值\n' +
          '        // const count;\n' +
          '    </script>\n' +
          '```\n' +
          '​\t3.const常量含义是你不能改变其指向的对象，例如user，都是你可以改变user属性。\n' +
          '```javascript\n' +
          '    <script>\n' +
          '        //3.常量的含义是你不能改变其指向的对象user，但是你可以改变user属性\n' +
          '        const user = {\n' +
          '            name:"zzz",\n' +
          '            age:24,\n' +
          '            height:175\n' +
          '        }\n' +
          '        console.log(user)\n' +
          '        user.name = "ttt"\n' +
          '        user.age = 22\n' +
          '        user.height = 188\n' +
          '        console.log(user)\n' +
          '    </script>\n' +
          '```\n' +
          '**const内存地址详解**\n' +
          '![](https://cdn.jsdelivr.net/gh/krislinzhao/IMGcloud/img/20200506210427.png)\n' +
          '​\t对象count一开始只是0x10的地址，直接将count（给count重新赋值，指向一个新的对象）指向地址改为0x20会报错，const是常量，无法更改对象地址。\n' +
          '​\t对象user一开始指向0x10地址，user有`Name`、`Age`、`Height`三个属性，此时修改属性`Name=\'ttt\'`，user对象的地址未改变，不会报错。\n' +
          '# 3. ES6的增强写法\n' +
          '## 3.1. ES6的对象属性增强型写法\n' +
          'ES6以前定义一个对象\n' +
          '```javascript\n' +
          'const name = "zzz";\n' +
          'const age = 18;\n' +
          'const user = {\n' +
          '  name:name,\n' +
          '  age:age\n' +
          '}\n' +
          'console.log(user);\n' +
          '```\n' +
          '​\tES6写法\n' +
          '```javascript\n' +
          'const name = "zzz";\n' +
          'const age = 18;\n' +
          'const user = {\n' +
          '\tname,age\n' +
          '}\n' +
          'console.log(user);\n' +
          '```\n' +
          '## 3.2\tES6对象的函数增强型写法\n' +
          'ES6之前对象内定义函数\n' +
          '```javascript\n' +
          'const obj = {\n' +
          '  run:function(){\n' +
          '     console.log("奔跑");\n' +
          '  }\n' +
          '}\n' +
          '```\n' +
          '  ES6写法\n' +
          '```javascript\n' +
          'const obj = {\n' +
          '  run(){\n' +
          '     console.log("奔跑");\n' +
          '  }\n' +
          '}\n' +
          '```\n' +
          '# 4.\t箭头函数\n' +
          '> 传统定义函数的方式\n' +
          '```javascript\n' +
          '  const aaa = function (param) {\n' +
          '      \n' +
          '  }\n' +
          '```\n' +
          '> 对象字面量中定义函数\n' +
          '```javascript\n' +
          'const obj = {\n' +
          '    bbb (param) {  },\n' +
          '}\n' +
          '```\n' +
          '> ES6中的箭头函数\n' +
          '```javascript\n' +
          '//const ccc = (参数列表) => {}\n' +
          '  const ccc = () => {}\n' +
          '```\n' +
          '## 4.1\t箭头函数的参数和返回值\n' +
          '### 4.1.1\t参数问题\n' +
          '> 1.放入两个参数\n' +
          '```javascript\n' +
          'const sum = (num1,num2) => {\n' +
          '    return num1 + num2 \n' +
          '}\n' +
          '```\n' +
          '> 2.放入一个参数,()可以省略\n' +
          '```javascript\n' +
          'const power = num => {\n' +
          '  return num * num\n' +
          '}\n' +
          '```\n' +
          '### 4.1.2\t函数内部\n' +
          '> 1.函数中代码块中有多行代码\n' +
          '```javascript\n' +
          'const test = () =>{\n' +
          '  console.log("hello zzz")\n' +
          '  console.log("hello vue")\n' +
          '}\n' +
          '```\n' +
          '> 2.函数代码块中只有一行代码，可以省略return\n' +
          '```javascript\n' +
          '// const mul = (num1,num2) => {\n' +
          '//   return num1 * num2\n' +
          '// }\n' +
          'const mul = (num1,num2) => num1* num2\n' +
          '// const log = () => {\n' +
          '//   console.log("log")\n' +
          '// }\n' +
          'const log = () => console.log("log")\n' +
          '```\n' +
          '## 4.3\t箭头函数的this使用\n' +
          '> 什么时候使用箭头函数\n' +
          '```javascript\n' +
          'setTimeout(function () {\n' +
          '\tconsole.log(this)\n' +
          '} , 1000);\n' +
          'setTimeout(() => {\n' +
          '\tconsole.log(this)//这里this找的是window的this\n' +
          '}, 1000);\n' +
          '```\n' +
          '> 结论：箭头函数没有this，这里this引用的是最近作用域（aaa函数里的this）的this。\n' +
          '```javascript\n' +
          '    const obj = {\n' +
          '      aaa(){\n' +
          '        setTimeout(function () {\n' +
          '          console.log(this)//window\n' +
          '         });\n' +
          '         setTimeout(() => {\n' +
          '          console.log(this)//obj\n' +
          '        });\n' +
          '      }\n' +
          '    }\n' +
          '    obj.aaa()\n' +
          '```\n' +
          '> ​\t上述中第一个是window对象的this，第二个箭头函数的this是obj的。\n' +
          '```javascript\n' +
          '    const obj = {\n' +
          '      aaa() {\n' +
          '        setTimeout(function () {\n' +
          '          setTimeout(function () {\n' +
          '            console.log(this) //window\n' +
          '          })\n' +
          '          setTimeout(() => {\n' +
          '            console.log(this) //window\n' +
          '          })\n' +
          '        })\n' +
          '        setTimeout(() => {\n' +
          '          setTimeout(function () {\n' +
          '            console.log(this) //window\n' +
          '          })\n' +
          '          setTimeout(() => {\n' +
          '            console.log(this) //obj\n' +
          '          })\n' +
          '        })\n' +
          '      }\n' +
          '    }\n' +
          '    obj.aaa()\n' +
          '```\n' +
          '# 5. 高阶函数\n' +
          '## 5.1\tfilter过滤函数\n' +
          '```javascript\n' +
          'const nums = [2,3,5,1,77,55,100,200]\n' +
          '//要求获取nums中大于50的数\n' +
          '//回调函数会遍历nums中每一个数，传入回调函数，在回调函数中写判断逻辑，返回true则会被数组接收，false会被拒绝\n' +
          'let newNums = nums.filter(function (num) {\n' +
          '  if(num > 50){\n' +
          '    return true;\n' +
          '  }\n' +
          '  return false;\n' +
          ' })\n' +
          ' //可以使用箭头函数简写\n' +
          '//  let newNums = nums.filter(num => num >50)\n' +
          '```\n' +
          '## 5.2\tmap高阶函数\n' +
          '```javascript\n' +
          '// 要求将已经过滤的新数组每项乘以2\n' +
          '//map函数同样会遍历数组每一项，传入回调函数为参数，num是map遍历的每一项，回调函数function返回值会被添加到新数组中\n' +
          'let newNums2 = newNums.map(function (num) {\n' +
          '  return num * 2\n' +
          ' })\n' +
          ' //简写\n' +
          '//  let newNums2 = newNums.map(num => num * 2)\n' +
          'console.log(newNums2);\n' +
          '```\n' +
          '## 5.3\treduce高阶函数\n' +
          '```javascript\n' +
          '// 3.reduce高阶函数\n' +
          '//要求将newNums2的数组所有数累加\n' +
          '//reduce函数同样会遍历数组每一项，传入回调函数和‘0’为参数，0表示回调函数中preValue初始值为0，回调函数中参数preValue是每一次回调函数function返回的值，currentValue是当前值\n' +
          '//例如数组为[154, 110, 200, 400],则回调函数第一次返回值为0+154=154，第二次preValue为154，返回值为154+110=264，以此类推直到遍历完成\n' +
          'let newNum = newNums2.reduce(function (preValue,currentValue) {\n' +
          '  return preValue + currentValue\n' +
          ' },0)\n' +
          '//简写\n' +
          '// let newNum = newNums2.reduce((preValue,currentValue) => preValue + currentValue)\n' +
          'console.log(newNum);\n' +
          '```\n' +
          '## 5.4综合使用\n' +
          '```javascript\n' +
          '//三个需求综合\n' +
          'let n = nums.filter(num => num > 50).map(num => num * 2).reduce((preValue,currentValue) => preValue + currentValue)\n' +
          'console.log(n);\n' +
          '```\n',
        favorite: 100,
        view: 122,
        comment: 0,
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('articles', null, {});
  }
};
