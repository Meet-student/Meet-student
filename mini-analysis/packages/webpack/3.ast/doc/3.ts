function join<T, W>(a: T, b: W) { }
join<number, string>(1, '2')

//1.获取实参数类型数组 [number,string]a number b string
//2.获取泛型的实际类型数组 [number, string]
//3.计算泛型的真实类型 [T=number,W=string]
//4.计算a和b的形参类型 [T,W]=>[number,string] a number b string