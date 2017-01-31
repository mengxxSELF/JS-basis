/*判断是否为公有方法的封装*/

function publicWay(attr,obj){
    return (attr in obj)&&(obj.hasOwnProperty(attr) );
}

function Person(){
    this.name='ok'
}
Person.prototype.age=20;
console.log(publicWay('age',publicWay))
console.log(publicWay('name',publicWay))
console.log(publicWay('sex',publicWay))
