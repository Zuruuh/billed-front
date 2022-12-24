Scenario 1
  Given Je suis un visiteur (non connecté).
  When Je ne remplis pas le champ e-mail ou le champ password du login employé
  And Je clique sur le bouton "Se connecter".
  Then Je reste sur la page "Login"
  And Je suis invité à remplir le champ manquant.

Scenario 2
  Given Je suis un visiteur (non connecté).
  When Je remplis le champ e-mail du login employé au mauvais format (sans la forme chaîne@chaîne)
  And Je clique sur le bouton "Se connecter".
  Then Je reste sur la page "Login"
  And Je suis invité à remplir le champ e-mail au bon format.

Scenario 3
  Given Je suis un visiteur (non connecté).
  When Je remplis le champ e-mail du login employé au bon format (sous la forme chaîne@chaîne), le champ password du login employé
  And Je clique sur le bouton "Se connecter".
  Then Je suis envoyé sur la page "Mes notes de frais".

Scenario 4
  Given Je suis connecté en tant qu'employé
  And Je suis sur la page "Mes notes de frais"
  When Je clique sur le bouton "Afficher un billet"
  Then Une modale doit s'ouvrir contenant la photo de la note de frais

Scenario 5
  Given Je suis connecté en tant qu'employé
  And Je suis sur la page "Mes notes de frais"
  When Je clique sur le bouton "Nouvelle note de frais"
  Then Je suis redirigé vers la page "Nouvelle note de frais"

Scenario 6
  Given Je suis connecté en tant qu'employé
  And Je suis sur la page "Mes notes de frais"
  When Je soumet le formulaire
  Then Je suis invité à remplir tous les champs du formulaire

Scenario 7
  Given Je suis connecté en tant qu'employé
  And Je suis sur la page "Mes notes de frais"
  When Je remplis tous les champs du formulaire excepté l'image
  And Je soumet le formulaire
  Then Je suis invité à soumettre une image

Scenario 8
  Given Je suis connecté en tant qu'employé
  And Je suis sur la page "Mes notes de frais"
  When Je remplis tous les champs du formulaire correctement
  And Je soumet une image dont le format n'est pas supporté "image1.webp"
  And Je soumet le formulaire
  Then Je suis invité a utiliser une image au format png ou jpeg

Scenario 9
  Given Je suis connecté en tant qu'employé
  And Je suis sur la page "Mes notes de frais"
  When Je remplis tous les champs du formulaire correctement
  And Je soumet le formulaire
  Then Je suis redirigé vers la page "Mes notes de frais"
  And Ma note de frais est ajouté
  And Ma note de frais est en status "En attente"

Scenario 10
  Given Je suis connecté en tant qu'employé
  And Je suis sur la page "Mes notes de frais"
  When Je clique sur le bouton "Me déconnecter"
  Then Je suis redirigé vers la page "Login"

