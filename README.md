# Repository pcf_academy
### Documentation

- [Overview](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview)
- [Property](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/property)
- [Dataset](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/dataset)
- [Context](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/context)
- [Instalation Microsoft Power Platform CLI](https://learn.microsoft.com/pt-br/power-platform/developer/cli/introduction)
- [Get Started - Create your first component](https://learn.microsoft.com/pt-br/power-apps/developer/component-framework/implementing-controls-using-typescript?tabs=before)
- [Best Pratices](https://learn.microsoft.com/pt-br/power-apps/developer/component-framework/code-components-best-practices)
- [Event - addonoutputchange](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/controls/addonoutputchange)
- [Limitations](https://learn.microsoft.com/pt-br/power-apps/developer/component-framework/limitations)

### Reference typscript 
- [React Lib @types/xrm](https://www.npmjs.com/package/@types/xrm)
- [React Typescript](https://www.typescriptlang.org/pt/docs/handbook/react.html)
- [React Lifecicle X Equivalent Hooks](https://levelup.gitconnected.com/react-lifecycle-methods-and-their-equivalents-in-functional-components-5677a3fa623d)
- [React Class X Hooks](https://dev.to/elanandkumar/react-component-lifecycle-with-hook-6lo)

### MVP's Blog
- [Diana birkelbach](https://dianabirkelbach.wordpress.com)
- [Scott Durow](https://www.develop1.net/public/)

### Comands
- [Reference](https://learn.microsoft.com/en-us/power-platform/developer/cli/reference/pcf#pac-pcf-init)


##### Create project bolth template:
```  
pac pcf init -ns [NAMESPACE] -n [NOMECONTROLE] -t field
```
```  
pac pcf init -ns [NAMESPACE] -n [NOMECONTROLE] -t field -fw react -npm
```  
```  
pac pcf init -ns [NAMESPACE] -n [NOMECONTROLE] -t dataset
```  
```  
pac pcf init -ns [NAMESPACE] -n [NOMECONTROLE] -t dataset -fw react -npm
```  

#####  Install npm in project.  
```  
npm install 
```  

##### Build project
```  
npm run build 
```  

##### Preview 
```  
npm start watch 
```  

##### Create authentication
###### Active Dataverse (Preterido)
```  
pac auth create -u [URL DO AMBIENTE] 
```  
###### Universal Profile
```  
PAC auth create -n [NOME CONEXÃO]  -env [URL DO AMBIENTE] 
``` 
###### Select Universal Profile
```  
pac auth select -n [NOME CONEXÃO]
``` 

##### Publish pcf 
###### Default
```  
pac pcf push -pp [PREFIXO PUBLICADOR EXISTENTE]
```  

###### publish incremental
```  
pac pcf push -pp [PREFIXO PUBLICADOR EXISTENTE] -inc
```  

###### publish incremental, select enviroment
```  
pac pcf push -pp [PREFIXO PUBLICADOR EXISTENTE] -inc -env [URL DO AMBIENTE]
```  