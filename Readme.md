# Optionset Progress bar with stages
Show Optionset how a Progress bar with stages.

# Technologies
- NodeJS
- React
- Power Platform CLI
- react-dom (npm install react react-dom)


# Run the following command to get all the required dependencies

npm install

# Develop
1. Clone the repository
2. Make changes
3. Run build and open in browser

    npm run start

# Build and Deploy
1. Clone the repository
2. Run build

    npm run build

3. Ensure auth profile has been created and selected
4. Create a new folder using the command `mkdir <folder name>` inside the sample component folder and navigate into the folder using the command `cd <folder name>`. 
5. Create a new solution project inside the folder using the following command:
    ```
    pac solution init --publisher-name <Name of the publisher> --publisher-prefix <Publisher prefix>
    ```
6. After the new solution project is created, refer to the location where the sample component is located. You can add the reference using the following command:
    ```
    pac solution add-reference --path <Path to the root of the sample component>
    ```
7. To generate a zip file from your solution project, you need to `cd` into your solution project directory and build the project using the following command:

    ```
    msbuild /t:restore
    # Generate release
    msbuild /t:rebuild /restore /p:Configuration=Release
    ```
8. Again, run the command `msbuild`.
9. The generated solution zip file will be available at `Solution\bin\debug` folder. Manually import the solution.