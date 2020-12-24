# Frontend Dev with Angular

As a prerequisite you need:

1.  [Node.js](https://nodejs.org/en/)
2.  Angular CLI `npm i -g @angular/cli`
3.  [Visual Studio Code](https://code.visualstudio.com/)
4.  [Geoserver](https://geoserver.org/)

# Plan:

1. Installer la librairie [OpenLayers](https://github.com/openlayers/openlayers):

```
npm install ol
```

2. Créer un fichier `src/app/core/config/map-config.ts` pour mettre les configurations d'une map.
3. Importer ce que nous avons besoin pour créer une map de la librairie OpenLayers et créer les configurations au fur et à mesure.
4. Créer un module Angular avec angular-cli

- On va expliquer aprés (Au cours de la formation) que ce qu'un module Angular

```
ng g m maps
```

5. Créer un composant Angular avec angular-cli dans le meme dossier que le module créer précédement

- On va expliquer aprés que ce qu'un composant Angular

```
ng g c maps
```

6. Créer une service Angular pour gérer notre map

- Importer la configuration
- Cette service doit contenir tous le code pour
  - Créer une map
  - Centrer dynamiquement une map
  - Ajouter des interactions

```
ng g s core/services/maps
```

7. Ouvrir `src/app/maps/maps.component.html`

- Ajouter le code Html de la map
- Ajouter le code Html des buttons d'interaction
- Ajouter le code Html de la légende

8. Ouvrir `src/app/maps/maps.component.ts`

- Ajouter le code pour afficher notre map en utilisant le service qu'on créer

9. Expliquer le code de la service qui permet communiquer avec l'api Geoserver

- Comment collecter les couches d'un espace de travail

10. Revenir vers le fichier `src/app/maps/maps.component.ts`

- Ajouter le code pour collecter les couches en utilisant le service qu'on créer
- Afficher les couches dans la légende dans un premier temps (puis on va ajouter une option pour activer/désactiver une couche)

11. Expliquer le code de la service qui permet de transformer les couches collecter de l'api en des couches compréhensible par notre Map.

- Comment créer un `ol/layer/Vector` (Couche à ajouter aprés dans la map)
- Comment créer un `ol/source/Vector` (Source de données de cette couche)
- Comment utiliser OpenLayers + Geoserver (Le service WFS) pour Collecter les Features d'une couche dans la partie `Création de source`

12. Revenir vers le fichier `src/app/maps/maps.component.ts`

- Afficher les couches créer par le service expliqué précédement dans la map
- Centrer la map en se basant sur une couche par défaut

13. Expliquer le code qui permet de créer des interactions

- Ajouter les listners des buttons pour appeler les interactions
- Implémenter l'interaction Select qui permet d'afficher les détails d'une Feature sélectionnée
- On va expliquer au cours de la formation comment implémenter d'autres interactions qui permet de déssiner une Feature et stocker dans geoserver, supprimer, modifier...

14. Implémenter une option pour activer/désactiver les couches


- Il faut ajouter ce code dans le fichier web.xml de geoserver

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