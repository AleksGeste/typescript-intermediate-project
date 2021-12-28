## typescript-intermediate-project

### Project setup
1. In the terminal run `npm init` to create package file
2. Install lite-server by terminal run `npm install -—save-dev lite-server`
3. Add script to package file by `"start": "lite-server"` in script section
4. Run server by typing in terminal `npm start`
5. Compile TS from other terminal run `tsc -w`


### Installing & Running WebPack 
Problem: we have many modules it's mean we have many http requests.
To solve it we could use WebPack to generate single file.
1. Run command `npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader`
2. Create `webpack.config.js` file and configure it 
3. Remove all from dist folder
4. Add script to package file like `"build": "webpack"` 
5. Run command `npm run build`

#### App is available online [here](http://207.154.228.44/). 