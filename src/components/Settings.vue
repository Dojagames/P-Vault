<script>
export default {

    data(){
        return {
            pwLength: GetSettingPwLenght(),
            lowerCase: GetSettingLower(),
            upperCase: GetSettingUpper(),
            numbers: GetSettingNumber(),
            symbols : GetSettingSymbol(),

            newPws: true,
            newNotes: false,
            newContacts: false,
            newIgnoreDups: true,

            fileinput: "",
            PwList: [],   

            localSelectedType: getSortingType(),
        }
    },
    components: {
        
    },
    props: {

    },
    methods: {
        GoBack(){
            this.$emit("handler", {selectedType: "cancel"});
        },
        ChangeSettings(){
            if(isNaN(this.pwLength) || this.pwLength == ""){
                alert("Number has to be a number");
                return;
            }
            SetSettingPwLenght(this.pwLength);
            SetSettingLower(this.lowerCase);
            SetSettingUpper(this.upperCase);
            SetSettingNumber(this.numbers);
            SetSettingSymbol(this.symbols);

            SaveSettings();
            SaveSortingType(this.localSelectedType);
            this.$emit("listHandler", {ignoreDups: this.newIgnoreDups, list: this.PwList});
            this.$emit("handler", {selectedType: this.localSelectedType});
        },



        HandleCsv(e){
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createInput(files[0]);
        }, 

        createInput(file) {
        let promise = new Promise((resolve, reject) => {
          var reader = new FileReader();
          var vm = this;
          reader.onload = e => {
            resolve((vm.fileinput = reader.result));
          };
          reader.readAsText(file);
        });

        promise.then(
          result => {
            /* handle a successful result */
            this.PwList = this.csvToArray(this.fileinput.replaceAll('"', ''));
          },
          error => {
            /* handle an error */ 
            console.log(error);
          }
        );
      },

      csvToArray(str, delimiter = ",") {
        const headers = str.slice(0, str.indexOf("\n")).replace( /\s/g, '').split(delimiter);
        const rows = str.slice(str.indexOf("\n") + 1).split("\n");
        const arr = rows.map(function (row) {
          const values = row.split(delimiter);
          const el = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return JSON.parse(JSON.stringify(object));
          }, {});
          return JSON.parse(JSON.stringify(el));
        });

        // return the array
        return JSON.parse(JSON.stringify(arr));
      },
    },
    created() {
    
    },
    mounted(){
        
    },
    watch: {

    },

}
</script>

<template>
    <div id="container">
        <div id="PwElement" class="settingElement">
            <h1>Password Generator Preset</h1>
            <div class="settingsBox">
                <div class="settingWrapper"><input type="checkbox" v-model="lowerCase"><p>Lowercase</p></div>
                <div class="settingWrapper"><input type="checkbox" v-model="upperCase"><p>Uppercase</p></div>
                <div class="settingWrapper"><input type="checkbox" v-model="numbers"><p>Numbers</p></div>
                <div class="settingWrapper"><input type="checkbox" v-model="symbols"><p>Symbols</p></div>
            </div>
            <div id="lengthBox">
                <input type="number" id="lenghtInput" v-model="pwLength">
                <p>length</p>
            </div>
        </div>

        <div id="ChangePwElement" class="settingElement">
            <h1>Change Password</h1>
        </div>

        <div id="sortingType" class="settingElement">
            <h1>Sorting Type</h1>
            <select name="sortingType" id="sortingTypeSelector" v-model="localSelectedType">
                <option value="alphabetical">alphabetical</option>
                <option value="timeCreated">time Created</option>
                <option value="lastUsed">last Used</option>
                <option value="mostUsed">most used</option>
            </select>
        </div>

        <div id="pwInput" class="settingElement">
            <h1>Import Passwords</h1>
            <div class="settingsBox">
                <div class="settingWrapper"><input type="checkbox" v-model="newIgnoreDups"><p>Ignore Duplicates</p></div>
            </div>
            <input type="file" id="csvFile" accept=".csv" @change="HandleCsv"/>
        </div>

        <div id="exitWrapper">
            <button id="saveBtn" @click="ChangeSettings()">Save</button>
            <button id="exitBtn" @click="GoBack()">Exit</button>
        </div>
    </div>
</template>

<style scoped>
    #container{
        background-color: rgb(63, 63, 63);
        width: 100%;
        height: 100%;
        border-radius: 12px;
        display: flex;
        flex-wrap: wrap;
        align-content: start;
        position: relative;
        justify-content: space-around;
        flex-shrink: 1;
    }

    .settingElement{
        border: 1px solid white;
        margin: 50px 0;
        padding: 5px;

        position: relative;
        width: 40%;
        min-width: 200px;
        min-height: 140px;
        max-height: 160px;
        height: 24%;
        display: block;
    }

    h1{
        text-align: center;
        margin: 0;
        padding-top: 10px;
    }

    button{
        margin: 30px 0 0 0;
        width: 50%;
        height: 35px;
        background-color: hsl(212, 100%, 50%);
        border-radius: 12px;
        border-width: 0px;
        padding: 1px 15px;
        outline: none;
        color: white;
    }

    .settingsBox{
        display: flex;
        position: relative;
        width: fit-content;
        left: 50%;
        transform: translateX(-50%);
    }
 
    .settingWrapper{
        margin: 5px;
        display: flex;;
    }

    #lengthBox{
        display: flex;
        position: relative;
        margin-bottom: 10px;
        
    }

    #lengthBox p{
        margin: 0;
        position: relative;
        left: -15px;
        top: 2.5px
    }

    #lenghtInput{
        width: 20px;
        height: 20px;
        text-align: center;
        background-color: #222;
        border-radius: 12px;
        border-width: 1px;
        border-color: #FFF;
        padding: 1px 15px;
        outline: none;
        position: relative;
        color: white;
        margin-left: 50%;
        transform: translateX(-50%);
    }

   #exitWrapper{
    position: absolute;
    bottom: 10px;
    width: 100%;
    height: fit-content;
   }

   #exitBtn{
    background-color: grey;
    width: 20%;
    position: absolute;
    right: 10px;
   }

   #saveBtn{
    left: 10px;
    width: 60%;
    position: relative ;
   }

   #sortingTypeSelector{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin: 10px;
    width: 30%;
   }

   #csvFile{
    margin-top: 5px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
   }
</style>