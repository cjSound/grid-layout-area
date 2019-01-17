<h1 align="center">vue-grid-layout</h1>



vue-grid-layout 基础上完善下画布大小限制 [原地址](https://github.com/jbaysolutions/vue-grid-layout), for Vue.js. **Heavily inspired in [React-Grid-Layout](https://github.com/STRML/react-grid-layout)**

### **Current version:** 2.3.3 (Supports Vue 2.2+)

### **For Vue 2.1.10 and below use version [2.1.3](https://github.com/jbaysolutions/vue-grid-layout/tree/2.1.3)**
### **For Vue 1 use version [1.0.3](https://github.com/jbaysolutions/vue-grid-layout/tree/1.0.3)** 

<br/>


### Documentation

#### Properties

##### GridLayout

* **isFixarea**
    
    * type: `Boolean`
    * default: `false`
    * required: `false`

    
    isFixarea默认false，即原版一样，没有限制高度，按照rowHeight固定的像素为单位节点，不断的下移，瀑布式
    isFixarea为true的时候，限制画布高度，前提是GridLayout父dom节点必须有高度，否则失效，此时的rowHeight和colNum一样，把画布等比划分成对应的栅格块
    