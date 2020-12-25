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

- C'est une bonne idée de séparer tout ce qui est code de configuration de l'autre code. D'une part pour avoir toutes les configurations dans un seul emplacement (Si on veut changer du code on sait ou), d'autre part cette configuration peut etre réutilisable aprés.

3. Importer ce que nous avons besoin pour créer une map de la librairie OpenLayers et créer les configurations au fur et à mesure.
4. Créer un module Angular avec angular-cli

- On va expliquer aprés (Au cours de la formation) qu'est ce qu'un module Angular

```
ng g m maps
```

5. Créer un `Component` Angular avec angular-cli dans le meme dossier que le module crée précédement

- On va expliquer aprés que ce qu'est une composante Angular

```
ng g c maps
```
- Ajouter les routes angular, on va définir la navigation de notre application, si on navigue vers /maps: on charge le module maps créé, et ce module doit charger la composante maps qui contient le code HTML (c'est le code qu'on va le voir dans le navigateur)

6. Créer un service Angular pour gérer notre map

- Importer la configuration
- Ce service doit contenir tout le code pour
  - On créer un service responsable pour gérer une map, toutes les actions effectuées à cette map doit exister dans ce service (un code réutilisable et claire)
  - Créer une map
  - Centrer dynamiquement une map
  - Ajouter des interactions

```
ng g s core/services/maps
```

7. Ouvrir `src/app/maps/maps.component.html`

- Ajouter le code Html de la map
- Ajouter le code Html des bouttons d'interaction
- Ajouter le code Html de la légende

8. Ouvrir `src/app/maps/maps.component.ts`

- Ajouter le code pour afficher notre map en utilisant le service qu'on a crée
- Dans cette partie juste on appel les fonctions deja crées.

9. Expliquer le code de service qui permet la communication avec l'api Geoserver

- On a crée un service qui a comme role de la communication avec l'api geoserver afin de collecter toutes les informations nécessaires à notre application coté `couches`.
- Comment peut-on collecter les couches d'un espace de travail

10. Revenir vers le fichier `src/app/maps/maps.component.ts`

- Ajouter le code pour collecter les couches en utilisant le service qu'on a crée
- Afficher les couches dans la légende dans un premier temps (puis on va ajouter une option pour activer/désactiver une couche)

11. Expliquer le code de service qui permet de transformer les couches collectées de l'api à des couches compréhensibles par notre Map.

- On a crée un service pour traiter les données venant du serveur (Geosever)
- Traitement: c'est le fait de convertir les données d'un format à un autre, dans notre cas on a des données venant de serveur de format `json` vers un autre format compréhensible par la map `vector`
- Comment créer un `ol/layer/Vector` (Couche à ajouter aprés dans la map)
- Comment créer un `ol/source/Vector` (Source de données de cette couche)
- Comment utiliser OpenLayers + Geoserver (Le service WFS) pour Collecter les Features d'une couche dans la partie `Création de source`.
- Chaque couche `Layer` est composée de plusieurs `Features`, il faut préciser au source de la couche `ol/source/Vector` comment charger ces `Features`

12. Revenir vers le fichier `src/app/maps/maps.component.ts`

- Afficher les couches crée par le service expliqué précédement dans la map
- On a ajouté précédemment le code pour collecter les couches existantes dans un espace de tarvail geoserver, puis on a affiché ces couches dans notre légende, maintenant on va changer le code pour intercepter la résultat de cette fonction, faire des traitements pour transformer les données puis retourner les données transformées.
- Centrer la map en se basant sur une couche par défaut
- On va choisir une couche par défaut qui contient des coordonnées `bounds`, faire du traitement pour avoir des lon lat, puis utiliser ces coordonnées pour centrer la map

13. Expliquer le code qui permet de créer des interactions

- Ajouter les listners des bouttons pour appeler les interactions
- Implémenter l'interaction Select qui permet d'afficher les détails d'une Feature sélectionnée
- On va expliquer au cours de la formation comment implémenter d'autres interactions qui permet de dessiner une Feature et stocker dans geoserver, supprimer, modifier...

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
