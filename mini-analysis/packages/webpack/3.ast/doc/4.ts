type Infer<K> = K extends 'number' ? number : string;
function sum<T>(a: T, b: T) {

}
sum<Infer<'number'>>(1, 2);

sum<number>(1, 2)