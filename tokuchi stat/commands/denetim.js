const Command = require("../base/Command.js");
const data = require("../models/voice.js")
const Data = require("../models/messages.js")
const Discord = require("discord.js")
class Denetim extends Command {
  constructor(client) {
    super(client, {
      name: "denetim",
      aliases: ["denetim"]
    });
  }

  async run(message, args, client) {
    let yasakli = [
      "759136367358902283",
      "782907483651964949",
      "762465614199259167",
      "760547456437321785",
      "784107120618111008",
      "790288451722281000",
      "759327821658456094",
      "775741847418568734",
      "777492427929813012"
    ];
    if (yasakli.includes(message.channel.id)) return;

    if (!args[0]) return message.channel.send('Rol bulunamadı.');
    var arananRol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || ""
    if (arananRol === "") return message.channel.send('Rol bulunamadı...');
    let pubu
    let kisiSayisi = 0;
    message.channel.send(`${arananRol} Rolündeki kişilerin ses bilgilerini gönderiyorum. Biraz zaman alabilir, bitmesini bekleyin.`);
    let roldekiKsayisi = 0;
    message.guild.members.cache.map(user => {
      if (user.roles.cache.has(arananRol.id)) {
        roldekiKsayisi++;
      }
    })
    message.guild.members.cache.map(user => {
      try {
        if (user.roles.cache.has(arananRol.id)) {
          var text = "";
          //##################
          data.findOne({
            user: user.id
          }, async (err, res) => {
            if (!res)
              text += "<@" + user.id + "> kişisinin kayıtlı ses verisi yok bu yüzden bilgileri gönderemiyorum.";
            if (res) {
              if (!res.state !== "") {
                if (res.channels.has(res.state)) {
                  res.channels.set(
                    res.state,
                    res.channels.get(res.state) + Date.now() - res.start
                  );
                }
              } else {
                res.channels.set(res.state, Date.now() - res.start);
              }
              let arr = []
              for (let [k, v] of res.channels) {
                if (message.guild.channels.cache.has(k)) {
                  arr.push({
                    channel: k,
                    duration: v
                  })
                }
              }
              let kayıt = arr.filter(x => message.guild.channels.cache.get(x.channel).parentID === "777158411896356894").map(x => x.duration)
              let sorun = arr.filter(x => message.guild.channels.cache.get(x.channel).parentID === "778296307248136232").map(x => x.duration)
              let publics = arr.filter(x => message.guild.channels.cache.get(x.channel).parentID === "775722354605162497" && !["727881654021914644"].includes(x.channel)).map(x => x.duration)
              let vk = arr.filter(x => message.guild.channels.cache.get(x.channel).parentID === "778278684347858984").map(x => x.duration)
              let stream = arr.filter(x => message.guild.channels.cache.get(x.channel).parentID === "778290504290402324").map(x => x.duration)
              //let terapi = arr.filter(x => message.guild.channels.cache.get(x.channel).parentID === "767355663407120394").map(x => x.duration)
              let dc = arr.filter(x => message.guild.channels.cache.get(x.channel).parentID === "778275857118658560").map(x => x.duration)
              let amongus = arr.filter(x => message.guild.channels.cache.get(x.channel).parentID === "778274435584491560").map(x => x.duration)
              let game = arr.filter(x => message.guild.channels.cache.get(x.channel).parentID === "778274435584491560").map(x => x.duration)
              let secret = arr.filter(x => message.guild.channels.cache.get(x.channel).parentID === "777153164532252672").map(x => x.duration)
              let müzik = arr.filter(x => message.guild.channels.cache.get(x.channel).parentID === "780490181362319370").map(x => x.duration)
              let sleep = arr.filter(x => x.channel === "727881654021914644").map(x => x.duration)
              kayıt.length > 0 ? kayıt = parseInt(kayıt.reduce((a, b) => a + b)) : kayıt = 0
              sorun.length > 0 ? sorun = parseInt(sorun.reduce((a, b) => a + b)) : sorun = 0
              publics.length > 0 ? publics = parseInt(publics.reduce((a, b) => a + b)) : publics = 0
              stream.length > 0 ? stream = parseInt(stream.reduce((a, b) => a + b)) : stream = 0
              amongus.length > 0 ? amongus = parseInt(amongus.reduce((a, b) => a + b)) : amongus = 0
              //terapi.length > 0 ? terapi = parseInt(terapi.reduce((a, b) => a + b)) : terapi = 0
              vk.length > 0 ? vk = parseInt(vk.reduce((a, b) => a + b)) : vk = 0
              dc.length > 0 ? dc = parseInt(dc.reduce((a, b) => a + b)) : dc = 0
              game.length > 0 ? game = parseInt(game.reduce((a, b) => a + b)) : game = 0
              secret.length > 0 ? secret = parseInt(secret.reduce((a, b) => a + b)) : secret = 0
              müzik.length > 0 ? müzik = parseInt(müzik.reduce((a, b) => a + b)) : müzik = 0
              sleep.length > 0 ? sleep = parseInt(sleep.reduce((a, b) => a + b)) : sleep = 0
              let toplam = parseInt(kayıt + game + secret + dc + vk + publics + sorun)

              text += `(<@${user.id}>) Kişisinin ses verileri **Toplam:** \`${getContent(toplam)}\`
**❯ Kayıt Odaları:** \`${getContent(kayıt)}\`
**❯ Public Odaları:** \`${getContent(publics)}\`
**❯ Sorun Çözme:** \`${getContent(sorun)}\`
**❯ VK:** \`${getContent(vk)}\`**DC:** \`${getContent(dc)}\`**Amongus:**\`${getContent(amongus)}\`
**❯ Secret Odalar:** \`${getContent(secret)}\`
**❯ Sleep Room:** \`${getContent(sleep)}\``
            }

            Data.findOne({
              user: user.id
            }, (err, rese) => {
              if (!rese) {
                text += "\n**❯ **<@" + user.id + "> **kişisinin kayıtlı mesaj verisi yok bu yüzden bilgileri gönderemiyorum.**";
              } else {
                let toplamMessage = [];
                let mesajKanallar = [];
                for (var [key, value] of rese.channels) {
                  if (message.guild.channels.cache.has(key)) {
                    mesajKanallar.push({
                      kanal: key,
                      mesaj: value
                    });
                  }
                  toplamMessage.push(value);
                }

                let mesajLar = mesajKanallar.sort(function (a, b) {
                  return b.mesaj - a.mesaj;
                });
                let tok = 0;
                let array = [];
                for (tok in mesajLar) {
                  if (message.guild.channels.cache.get(mesajLar[tok].kanal).id == '782907483651964949' ||
                    message.guild.channels.cache.get(mesajLar[tok].kanal).id == '790288451722281000'
                  )
                    array.push(" **" + capitalizeIt(message.guild.channels.cache.get(mesajLar[tok].kanal).name.replace("#", " ").replace(/-/g, " ")) + ":** `" + mesajLar[tok].mesaj + "`");
                }
                let mesasVeriler = "";
                for (let i = 0; i < array.length; i++) {
                  mesasVeriler += array[i] + " ";
                }
                text += "\n**❯**" + mesasVeriler + " (**Toplam:** \`" + toplamMessage.reduce((a, b) => a + b) + "\`)";
              }
              kisiSayisi++;
              message.channel.send(`───────────────\n${kisiSayisi}. ${text}\n───────────────`)
              if (kisiSayisi == roldekiKsayisi)
                message.channel.send(`${arananRol} Rolündeki **${roldekiKsayisi}** Kişi listelendi.`)
            })
          });
          //##################          
        }
      } catch (e) {
        const newLocal = '<@' + user.id + '> Ses bilgisini gönderirken sorun oluştu. :' + e;
        message.channel.send(newLocal)
        console.log('Hata: ' + e);
      }
    })
  }
}

function capitalizeIt(str) {
  if (str && typeof (str) === "string") {
    str = str.split(" ");
    for (var i = 0, x = str.length; i < x; i++) {
      if (str[i]) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      }
    }
    return str.join(" ");
  } else {
    return str;
  }
}

function getContent(duration) {
  let arr = []
  if (duration / 3600000 > 1) {
    let val = parseInt(duration / 3600000)
    let durationn = parseInt((duration - (val * 3600000)) / 60000)
    arr.push(`${val} saat`)
    arr.push(`${durationn} dk.`)
  } else {
    let durationn = parseInt(duration / 60000)
    arr.push(`${durationn} dk.`)
  }
  return arr.join(", ")
}

module.exports = Denetim;