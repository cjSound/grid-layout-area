<template>
    <div id="app">
        <h1 style="text-align: center">Vue Grid Layout</h1>
        <!--<pre>{{ layout | json }}</pre>-->
        <div>
            <div class="layoutJSON">
                Displayed as <code>[x, y, w, h]</code>:
                <div class="columns">
                    <div class="layoutItem" v-for="item in layout" :key="item.i">
                        <b>{{item.i}}</b>: [{{item.x}}, {{item.y}}, {{item.w}}, {{item.h}}]
                    </div>
                </div>
            </div>
            <!--<div class="layoutJSON">
                Displayed as <code>[x, y, w, h]</code>:
                <div class="columns">
                    <div class="layoutItem" v-for="item in layout2">
                        <b>{{item.i}}</b>: [{{item.x}}, {{item.y}}, {{item.w}}, {{item.h}}]
                    </div>
                </div>
            </div>-->
        </div>
        <div id="content">
            <button @click="decreaseWidth">Decrease Width</button>
            <button @click="increaseWidth">Increase Width</button>
            <button @click="addItem">Add an item</button>
            <!-- Add to show rtl support -->
            <button @click="changeDirection">Change Direction</button>
            <input type="checkbox" v-model="draggable"/> Draggable
            <input type="checkbox" v-model="resizable"/> Resizable
            <input type="checkbox" v-model="mirrored"/> Mirrored
            <input type="checkbox" v-model="responsive"/> Responsive
            <div style="margin-top: 10px;margin-bottom: 10px;">
                Row Height: <input type="number" v-model="rowHeight"/> Col nums: <input type="number" v-model="colNum"/>
            </div>
            <div class="content" style="width:100%;height:512px;">
                <grid-layout
                    :layout.sync="layout"
                    :col-num="parseInt(colNum)"
                    :is-draggable="draggable"
                    :is-resizable="resizable"
                    :is-fixarea="true"
                    :is-mirrored="mirrored"
                    :vertical-compact="true"
                    :use-css-transforms="false"
                    :responsive="responsive"
                >
                    <grid-item v-for="item in layout" :key="item.i"
                            :x="item.x"
                            :y="item.y"
                            :w="item.w"
                            :h="item.h"
                            :i="item.i"
                            @resize="resize"
                            @move="move"
                            @resized="resized"
                            @moved="moved"
                    >
                        <!--<custom-drag-element :text="item.i"></custom-drag-element>-->
                        {{item.i}}
                        x:{{item.x}}
                        y:{{item.y}}
                        w:{{item.w}}
                        h:{{item.h}}
                        
                        <!--<button @click="clicked">CLICK ME!</button>-->
                    </grid-item>
                </grid-layout>
            </div>
            
            <hr/>
        </div>
    </div>
</template>

<script>
    import GridItem from './components/GridItem.vue';
    import GridLayout from './components/GridLayout.vue';
    import TestElement from './components/TestElement.vue';
    import CustomDragElement from './components/CustomDragElement.vue';
    import {getDocumentDir, setDocumentDir} from "./helpers/DOM";
    //var eventBus = require('./eventBus');

    let testLayout = [
        {"x":0,"y":0,"w":2,"h":2,"i":"0"},
        {"x":2,"y":0,"w":2,"h":4,"i":"1"},
    ];

    export default {
        name: 'app',
        components: {
            // ResponsiveGridLayout,
            GridLayout,
            GridItem,
            TestElement,
            CustomDragElement,
        },
        data () {
            return {
                layout: JSON.parse(JSON.stringify(testLayout)),
                layout2: JSON.parse(JSON.stringify(testLayout)),
                draggable: true,
                resizable: true,
                mirrored: false,
                responsive: true,
                rowHeight: 30,
                colNum: 12,
                index: 0
            }
        },
        mounted: function () {
            this.index = this.layout.length;
        },
        methods: {
            clicked: function() {
                window.alert("CLICK!");
            },
            increaseWidth: function() {
                let width = document.getElementById("content").offsetWidth;
                width += 20;
                document.getElementById("content").style.width = width+"px";
            },
            decreaseWidth: function() {
                let width = document.getElementById("content").offsetWidth;
                width -= 20;
                document.getElementById("content").style.width = width+"px";
            },
            removeItem: function(item) {
                //console.log("### REMOVE " + item.i);
                this.layout.splice(this.layout.indexOf(item), 1);
            },
            addItem: function() {
                // let self = this;
                //console.log("### LENGTH: " + this.layout.length);
                let item = {"x":0,"y":0,"w":2,"h":2,"i":this.index+"", whatever: "bbb"};
                this.index++;
                this.layout.push(item);
            },
            move: function(i, newX, newY){
                // console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
            },
            resize: function(i, newH, newW, newHPx, newWPx){
                // console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
            },
            moved: function(i, newX, newY){
                console.log("### MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
            },
            resized: function(i, newH, newW, newHPx, newWPx){
                console.log("### RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
            },
            /**
             * Add change direction button
             */
            changeDirection() {
                let documentDirection = getDocumentDir();
                let toggle = "";
                if (documentDirection === "rtl") {
                    toggle = "ltr"
                } else {
                    toggle = "rtl"
                }
                setDocumentDir(toggle);
                //eventBus.$emit('directionchange');
            }
        },
    }
</script>

<style>
    /*    #app {
            font-family: 'Avenir', Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-align: center;
            color: #2c3e50;
            margin-top: 60px;
        }

        h1, h2 {
            font-weight: normal;
        }

        ul {
            list-style-type: none;
            padding: 0;
        }

        li {
            display: inline-block;
            margin: 0 10px;
        }

        a {
            color: #42b983;
        }*/
</style>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
