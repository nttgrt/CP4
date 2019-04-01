/*
let dimInit = 16;
console.log("entered js script");
*/
var app = new Vue({
    el: '#app',
    data: {
        swatches: [],
        activeColor: '',
        rgb: {
            r: 0,
            g: 0,
            b: 0
        },
        title: '',
        rgbString: 'rgb(0,0,0)',
    },
    /*computed: {
        
    },*/
    watch: {
        'rgb.r': function() {
            this.changeColor();
            document.getElementById("rInput").style.backgroundColor = this.rgbToString(this.rgb.r, 0, 0);
            if (this.rgb.r < 200) {
                document.getElementById("rInput").style.color = "white";
            }
            else {
                document.getElementById("rInput").style.color = "black";
            }
        },
        'rgb.g': function() {
            this.changeColor();
            document.getElementById("gInput").style.backgroundColor = this.rgbToString(0, this.rgb.g, 0);
            if (this.rgb.g < 200) {
                document.getElementById("gInput").style.color = "white";
            }
            else {
                document.getElementById("gInput").style.color = "black";
            }
        },
        'rgb.b': function() {
            this.changeColor();
            document.getElementById("bInput").style.backgroundColor = this.rgbToString(0, 0, this.rgb.b);
            if (this.rgb.b < 200) {
                document.getElementById("bInput").style.color = "white";
            }
            else {
                document.getElementById("bInput").style.color = "black";
            }
        }
    },
    methods: {
        changeColor() {
            console.log("ran changeColor");
            //let colorMain = this.toHex(this.activeColor);
            let rMain = this.rgbLimit(this.rgb.r);
            let gMain = this.rgbLimit(this.rgb.g);
            let bMain = this.rgbLimit(this.rgb.b);
            this.rgbString = this.rgbToString(rMain, gMain, bMain);
            //let colorMain = "rgb(" + rMain + ", " + gMain + ", " + bMain + ")";
            document.getElementById("colorMain").style.backgroundColor = this.rgbString;
        },
        rgbToString(r, g, b) {
            return("rgb(" + r + ", "+ g + ", " + b + ")");
        },
        rgbLimit(number) {
            if (number === undefined || number === '') {
                return 0;
            }
            if (number > 255) {
                return 255;
            }
            return number;
        },
        setBG(currentSwatch) {
            console.log("setBG got called");
            //document.getElementById(currentSwatch._id).style.backgroundColor = currentSwatch.rgbString;
            //currentDiv.style.backgroundColor = currentSwatch.rgbString;
            var styleNode = document.createStyleNode("#" + currentSwatch._id + " {background-color: " + currentSwatch.rgbString + "}");
            document.getElementById(swatchStyling).appendChild(styleNode);
            //document.getElementById(swatchStyling).innerHTML += ("<style> #" + currentSwatch._id + " {background-color: " + currentSwatch.rgbString + "}</style>");
        },
        async getSwatches() {
            //console.log("called getSwatches");
            try {
                let response = await axios.get("/api/swatches");
                this.swatches = response.data;
                return true;
              } catch (error) {
                console.log(error);
              }
        },
        async saveSwatch() {
            console.log("attempting to save Swatch");
            try {
            response = await axios.post('/api/swatches', {
                title: this.title,
                rgbString: this.rgbString,
            });
            console.log(response);
            this.getSwatches();
            this.resetMain();
            }
            catch(error) {
                console.log(error);
            }
        },
        async deleteSwatch(swatch) {
            //console.log("attempting to delete Swatch");
            try {
              await axios.delete("/api/swatches/" + swatch._id);
              this.getSwatches();
              return true;
            } catch (error) {
              console.log(error);
            }
        },
        async replaceSwatch(swatch) {
            try {
                await axios.put("/api/swatches/" + swatch._id, {
                  title: this.title,
                  rgbString: this.rgbString,
                });
                this.getSwatches();
                this.resetMain();
                return true;
              } catch (error) {
                console.log(error);
              }
        },
        //toHex isn't being used
        toHex(inputNum) {
            //console.log("input recieved is " + inputNum);
            //console.log("input.length is " + inputNum.length);
            if (inputNum === undefined || inputNum === 0) {
                console.log("toHex returning undefined");
                return('#000000');
            }
            while (inputNum.length < 6) {
                inputNum = '0' + inputNum;
            }
            if (inputNum.length > 6) {
                inputNum = inputNum.substr(0, (inputNum.length - 6));
            }
            returnString = '#' + inputNum;
            console.log("toHex returning " + returnString);
            return('#' + inputNum);
        },

        resetMain() {
            this.rgb.r = 0;
            this.rgb.g = 0;
            this.rgb.b = 0;
            this.rgb.string = "rgb(0,0,0)";
        }
    },
    created() {
        //console.log("called Created");
        this.getSwatches();
    }
});