初始化什么作用
plugin是怎么数组传进去的？
那这样不是每一次有更新的话插件方法都会重新调用一遍


seRef之后为什么要重新赋值啊？ 为什么可以避免闭包啊？很费解
fn
let ref  = useRef();
//ref.current =fn





如果要走默认的， 传参会变化呢
走默认的请求，参数会动态改变
依赖不

const { data, loading } = useRequest(() => getUserSchool(userId), {
    refreshDeps: [userId],
  });