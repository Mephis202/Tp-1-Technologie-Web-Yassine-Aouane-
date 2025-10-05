// Script JS pour manipuler le HTML du formulaire

// 1. Modifier le lien Wikipedia pour pointer vers le site français
// 2. Vérifier le texte du premier input lors du clic sur le bouton
// 3. Modifier le texte des choix radio avec getElementById et nextSibling
// 4. Modifier le texte "Volume" selon le choix radio et le max de la jauge
// 5. Modifier le texte de la case à cocher en "Mute" et gérer le mute
// 6. Ajouter une image à la fin de la section Lien et images
// 7. Créer un menu dynamique pour afficher/cacher les sections
// 8. Récupérer l'année du champ date et l'afficher dans la console
// 9. Animer les barres de progression

// Le code est organisé par fonctionnalité, chaque bloc est précédé d'un commentaire explicatif

document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Modification du lien Wikipedia ---
    // Sélectionne le lien Wikipedia et modifie son href
    const wikiLink = document.querySelector('a[href*="wikipedia"]');
    if (wikiLink) {
        wikiLink.href = "https://fr.wikipedia.org";
        console.log("Lien Wikipedia modifié :", wikiLink.href);
    } else {
        console.log("Lien Wikipedia non trouvé");
    }

    // --- 2. Vérification du champ texte lors du clic sur le bouton ---
    // Si la valeur n'est pas "Oui" ou "Non", affiche un message d'erreur
    const inputText = document.querySelector('input[type="text"]');
    const button = document.querySelector('button');
    if (button && inputText) {
        button.addEventListener('click', function(event) {
            console.log("Valeur du champ texte :", inputText.value);
            if (inputText.value !== "Oui" && inputText.value !== "Non") {
                inputText.value = "Il faut mettre Oui ou Non";
                console.log("Texte modifié car valeur incorrecte.");
            } else {
                console.log("Valeur correcte :", inputText.value);
            }
        });
    } else {
        console.log("Bouton ou champ texte non trouvé");
    }

    // --- 3. Modification des labels radio ---
    // Utilise getElementById et nextSibling pour changer le texte des labels
    var choix1 = document.getElementById('choix1');
    var choix2 = document.getElementById('choix2');
    var choix3 = document.getElementById('choix3');
    if (choix1 && choix1.firstChild && choix1.firstChild.nextSibling) {
        choix1.firstChild.nextSibling.textContent = ' HP';
    }
    if (choix2 && choix2.firstChild && choix2.firstChild.nextSibling) {
        choix2.firstChild.nextSibling.textContent = ' Casque';
    }
    if (choix3 && choix3.firstChild && choix3.firstChild.nextSibling) {
        choix3.firstChild.nextSibling.textContent = ' Bluetooth';
    }

    // --- 4. Gestion du label et de la jauge de volume ---
    // Change le texte du label volume selon le choix radio
    var radios = document.querySelectorAll('input[name="choix"]');
    var volumeLabel = document.querySelector('.volume-label');
    var volumeRange = document.querySelector('input[type="range"]');
    var volumeValue = null;
    // Cherche le span qui affiche la valeur sous la jauge
    if (volumeRange) {
        var parent = volumeRange.parentElement;
        if (parent) {
            var spans = parent.getElementsByTagName('span');
            if (spans.length > 1) {
                volumeValue = spans[1];
            }
        }
        // Affiche la valeur au chargement
        if (volumeValue) {
            volumeValue.textContent = volumeRange.value;
        }
        // Met à jour la valeur à chaque modification de la jauge
        volumeRange.addEventListener('input', function() {
            if (volumeValue) {
                volumeValue.textContent = this.value;
            }
        });
    }
    // Fixe le maximum de la jauge à 100
    if (volumeRange) {
        volumeRange.max = 100;
        console.log('Valeur max de la jauge de volume :', volumeRange.max);
    }
    // Change le texte du label volume selon le choix radio
    function updateVolumeLabel(e) {
        if (!volumeLabel) return;
        switch (this.value) {
            case "1":
                volumeLabel.textContent = "Volume HP";
                break;
            case "2":
                volumeLabel.textContent = "Volume Casque";
                break;
            case "3":
                volumeLabel.textContent = "Volume Bluetooth";
                break;
            default:
                volumeLabel.textContent = "Volume";
        }
    }
    radios.forEach(function(radio) {
        radio.addEventListener('change', updateVolumeLabel);
    });

    // --- 5. Gestion de la case à cocher "Mute" ---
    // Modifie le texte et désactive/réactive la jauge de volume
    var muteLabel = null;
    var labels = document.querySelectorAll('label');
    labels.forEach(function(label) {
        if (label.textContent.includes('Une case à cocher')) {
            label.textContent = 'Mute';
            muteLabel = label;
        }
    });
    if (muteLabel) {
        var muteCheckbox = muteLabel.querySelector('input[type="checkbox"]');
        var volumeRange = document.querySelector('input[type="range"]');
        if (muteCheckbox && volumeRange) {
            muteCheckbox.addEventListener('change', function() {
                volumeRange.disabled = muteCheckbox.checked;
            });
        }
    }

    // --- 6. Ajout d'une image à la fin de la section Lien et images ---
    // Crée et insère une image UPHF à la fin de la première section
    var lienImagesSection = document.querySelector('.section');
    if (lienImagesSection) {
        var img = document.createElement('img');
        img.src = 'https://upload.wikimedia.org/wikipedia/commons/b/bd/UPHF_logo.svg';
        img.width = 200;
        img.alt = 'Logo UPHF';
        lienImagesSection.appendChild(img);
    }

    // --- 7. Création du menu dynamique ---
    // Cache toutes les sections et crée un menu pour les afficher
    var sections = document.querySelectorAll('.container .section');
    var menuDiv = document.createElement('div');
    menuDiv.id = 'menu';
    menuDiv.style.padding = '10px';
    menuDiv.style.borderBottom = '2px solid #aaa';
    menuDiv.style.background = '#f7f7f7';
    menuDiv.style.marginBottom = '10px';
    var menuTitle = document.createElement('strong');
    menuTitle.textContent = 'Menu : Afficher les parties';
    menuDiv.appendChild(menuTitle);
    var sectionNames = ['Lien et images', 'Des éléments !', 'Barres de progression'];
    var menuCheckboxes = [];
    sections.forEach(function(section, i) {
        var label = document.createElement('label');
        label.style.marginLeft = '15px';
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = i;
        checkbox.style.marginRight = '5px';
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(sectionNames[i]));
        menuDiv.appendChild(label);
        // Au démarrage, cache la section et décoche la case
        section.style.display = 'none';
        checkbox.checked = false;
        menuCheckboxes.push(checkbox);
        // Affiche/masque la section selon la case cochée
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                sections[i].style.display = '';
            } else {
                sections[i].style.display = 'none';
            }
        });
    });
    // Insère le menu en haut du formulaire
    var container = document.querySelector('.container');
    if (container) {
        container.insertBefore(menuDiv, container.firstChild);
    }

    // --- 8. Récupération de l'année du champ date ---
    // Affiche l'année choisie dans la console
    var dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        dateInput.addEventListener('change', function() {
            var val = this.value;
            if (val) {
                var year = val.split('-')[0];
                console.log('Année choisie :', year);
            }
        });
    }

    // --- 9. Animation des barres de progression ---
    // Les deux barres partent de zéro et progressent de 5% toutes les secondes
    var progressDownload = document.querySelector('.progress-download');
    var progressSpace = document.querySelector('.progress-space');
    if (progressDownload && progressSpace) {
        progressDownload.style.width = '0%';
        progressSpace.style.width = '0%';
        var percent = 0;
        var interval = setInterval(function() {
            percent += 5;
            if (percent > 100) percent = 100;
            progressDownload.style.width = percent + '%';
            progressSpace.style.width = percent + '%';
            if (percent === 100) clearInterval(interval);
        }, 1000);
    }
});
