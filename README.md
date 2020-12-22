# Frontend Dev with Angular

As a prerequisite you need:

1.  [Node.js](https://nodejs.org/en/)
2.  Angular CLI `npm i -g @angular/cli`
3.  [Visual Studio Code](https://code.visualstudio.com/)
4.  [Geoserver](https://geoserver.org/)

To get BING maps Key:
https://www.bingmapsportal.com/

- Enable cross-origin in geoserver (A resource makes a cross-origin HTTP request when it requests a resource from a different domain, protocol, or port to its own) in our case (on localhost) our application will run on port 4200 but geoserver run on port 8080

```xml
  <filter>
    <filter-name>cross-origin</filter-name>
    <filter-class>org.eclipse.jetty.servlets.CrossOriginFilter</filter-class>
  </filter>
  <filter-mapping>
    <filter-name>cross-origin</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>

  <filter>
    <filter-name>cross-origin</filter-name>
    <filter-class>org.eclipse.jetty.servlets.CrossOriginFilter</filter-class>
    <init-param>
      <param-name>chainPreflight</param-name>
      <param-value>false</param-value>
    </init-param>
    <init-param>
      <param-name>allowedOrigins</param-name>
      <param-value>_</param-value>
    </init-param>
    <init-param>
      <param-name>allowedMethods</param-name>
      <param-value>GET,POST,PUT,DELETE,HEAD,OPTIONS</param-value>
    </init-param>
    <init-param>
      <param-name>allowedHeaders</param-name>
      <param-value>_</param-value>
    </init-param>
  </filter>
```

1- Configurer et afficher une Map dans notre interface Web.
  a- Comment utiliser une library (OpenLayers)
  b- Base layers (OSM, Bing)
  c- Projection
  d- Comment centrer le vue d'une map en se basant sur des données d'une couche
2- Collecter les données (Les couches `Layers` d'un espace de travail `Worjspace`) de geoserver api.
  a- Geoserver API
  b- Angular HTTP
3- Afficher les couches `Layers` dans notre map.
  a- Comment préparer les données de l'API pour les afficher
  b- Affichage (Ajouter des layers dans notre map)
  c- Utiliser des techniques Angular pour créer un outil qui permet de Afficher/Cacher une couche
4- Ajouter un outil pour afficher les informations d'une champ `Feature` sélectionné.
  a- Créer une interaction de type select
  b- Créer une popup
  c- Afficher les données d'un champ sélectionner dans une popup
5- Ajouter une outil pour déssiner et ajouter les informations d'un champ `Feature` et stocker les résultats dans Geoserver.
  a- Créer une interaction de type draw
  b- Afficher une popup pour saisir des informations
  c- Stocker les données
6- Ajouter un outil pour supprimer un champ `Feature` sélectionné.
  a- Créer une interaction de type select
  b- Supprimer (sans popup de confirmation)
