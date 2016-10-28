/**
 * Mortgage calculator functions
 * courtesy imported from the old websites.
 * Need a complete rewrite.
 */

function getPrixAchatAvecFraisNotaire(prixAchat, fraisNotaire) {
  return Math.ceil((prixAchat * (fraisNotaire/100)) + prixAchat);
}

function getRevenuAnnuelNetMin(prixAchat, pourcentage1, pourcentage2, pourcentage3, pourcentage4, fraisAnnexes, pourcentage5) {
  return Math.ceil(((prixAchat * (pourcentage1 / 100) * (pourcentage2 / 100)
    + prixAchat * (pourcentage3 / 100) * (pourcentage4 / 100) + fraisAnnexes))
    / (pourcentage5/100));
}

function getFondsPropresMinPourPrixAchat(prixAchat, pourcentage1) {
  return Math.ceil(prixAchat * (pourcentage1 / 100));
}

function getPrixAchatSansFraisNotaire(fondsPropres, pourcentage1) {
  return Math.floor(fondsPropres / (pourcentage1 / 100));
}

function getPrixAchatMaxSansFraisNotairePourRevenu(revenuAnnuel, diviseur1, facteur1, fraisAnnexes, pourcentage1, pourcentage2) {
  return Math.floor(((((revenuAnnuel / diviseur1) * facteur1) - fraisAnnexes) / (pourcentage1 / 100)) / (pourcentage2 / 100));
}

function getPrixAchatMaxSansFraisNotaire(revenuAnnuel, montant1, fraisAnnexes, montant3, pourcentage2) {
  return Math.floor((revenuAnnuel / montant1 / fraisAnnexes / montant3 / (pourcentage2 / 100)));
}

function getFondsPropresMinPourRevenuAnnuel(montant, pourcentage1) {
  return Math.ceil(montant * (pourcentage1 / 100));
}

function getPret(prixAchat, prixAchatTotal, fonds, pourcentage) {

  var target = Math.max(prixAchatTotal - fonds, 0);
  var maxPret = (pourcentage/100) * prixAchat;

  return Math.floor(Math.min(target, maxPret));
}

function getPretEnPremierRang(prixAchat, prixAchatTotal, fondsPropres, pourcentage) {
  return getPret(prixAchat, prixAchatTotal, fondsPropres, pourcentage);
}

function getPretEnDeuxiemeRang(prixAchat, prixAchatTotal, fondsPropres, pretEnPremierRang, pourcentage) {
  return getPret(prixAchat, prixAchatTotal, fondsPropres+pretEnPremierRang, pourcentage);
}

/*
 getPretEnDeuxiemeRang(price,
 totalprice,
 propres,
 pretPremier,
 80.0
 );
 */

function getFinancementHypothecaire(pretEnPremierRang, pretEnDeuxiemeRang) {

  return Math.ceil(pretEnPremierRang + pretEnDeuxiemeRang);
}

function getTauxEndettement(financementHypothecaire, prixAchat, echelle) {

  return Math.ceil((financementHypothecaire / prixAchat) * echelle);
}

function getRapportChargesRevenus(pretPremierRang, pourcentage1, pretDeuxiemeRang,
                                  pourcentage2, fraisAnnexes, revenuAnnuel, echelle) {

  return Math.ceil(((pretPremierRang * (pourcentage1 / 100) + pretDeuxiemeRang * (pourcentage2 / 100) + fraisAnnexes) / revenuAnnuel) * echelle);
}

function getInteretsEnPremierRang(pretEnPremierRang, pourcentage) {

  return Math.ceil(pretEnPremierRang * (pourcentage / 100));
}

function getInteretsEnDeuxiemeRang(pretEnDeuxiemeRang, pourcentage) {

  return Math.ceil(pretEnDeuxiemeRang * (pourcentage / 100));
}


function getAmortissementEnPremierRang(pretEnPremierRang, pourcentage) {

  return Math.ceil(pretEnPremierRang * (pourcentage / 100));
}

function getAmortissementEnDeuxiemeRang(pretEnDeuxiemeRang, pourcentage) {

  return Math.ceil(pretEnDeuxiemeRang * (pourcentage / 100));
}

function getChargeMensuelle(interetsEnPremierRang, interetsEnDeuxiemeRang, amortissementEnPremierRang, amortissementEnDeuxiemeRang, fraisAnnexes) {

  return Math.ceil((interetsEnPremierRang + interetsEnDeuxiemeRang + amortissementEnPremierRang + amortissementEnDeuxiemeRang + fraisAnnexes) / 12);
}

function getChargeAnnuelle(interetsEnPremierRang, interetsEnDeuxiemeRang, amortissementEnPremierRang, amortissementEnDeuxiemeRang, fraisAnnexes) {

  return Math.ceil(interetsEnPremierRang + interetsEnDeuxiemeRang + amortissementEnPremierRang + amortissementEnDeuxiemeRang + fraisAnnexes);
}
