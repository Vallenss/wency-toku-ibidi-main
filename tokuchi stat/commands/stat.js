const Command = require("../base/Command.js");
const data = require("../models/voice.js")
const Data = require("../models/messages.js")
const Discord = require("discord.js")
const ms = require("ms")
class STAT extends Command {
    constructor(client) {
        super(client, {
            name: "me",
            aliases: ["stats"]
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
          var user = message.mentions.users.first() || this.client.users.cache.get(args[0]) || message.author
          let member = message.guild.members.cache.get(user.id);
          const embed = new Discord.MessageEmbed()
            .setAuthor(user.tag, user.avatarURL({ dynamic: true }))
            .setThumbnail(user.avatarURL({ dynamic: true }))
            .setColor(member.displayHexColor || "RANDOM")
            .setDescription(`${member} (${member.roles.hoist || member.roles.highest}) kişisinin sunucu verileri`)
          data.findOne({ user: user.id }, async (err, res) => {
            if (!res) return message.channel.send("<@" + user.id + "> kişisinin kayıtlı ses verisi yok bu yüzden bilgileri gönderemiyorum.")
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
                  arr.push({ channel: k, duration: v })
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
              let filterArr = arr.sort((a, b) => b.duration - a.duration)
              let channelSize = filterArr.length
              filterArr.length > 10 ? filterArr.length = 10 : filterArr.length = filterArr.length
              let channels = []
              let num = 1
              for (let i = 0; i < filterArr.length; i++) {
                channels.push(`\`${num++}.\` ${message.guild.channels.cache.get(filterArr[i].channel).name}: \`${getContent(filterArr[i].duration)}\` `)
              }
              if (channels.length > 0) {
                embed.addField("❯ Kanal Bilgileri", `\`•\` Toplam: \`${getContent(toplam)}\`\n\`•\` Kayıt Odaları: \`${getContent(kayıt)}\`\n\`•\` Public Odaları: \`${getContent(publics)}\`\n\`•\` Sorun Çözme: \`${getContent(sorun)}\`\n\`•\` Terapi Odaları: \`${getContent(terapi)}\`\n\`•\` Stream Odaları: \`${getContent(stream)}\`\n\`•\` Among Us: \`${getContent(amongus)}\`\n\`•\` Vampir Köylü: \`${getContent(vk)}\`\n\`•\` Doğruluk Cesaret: \`${getContent(dc)}\`\n\`•\` Müzik Odaları: \`${getContent(müzik)}\`\n\`•\` Oyun Odaları: \`${getContent(game)}\`\n\`•\` Secret Odalar: \`${getContent(secret)}\`\n\`•\` Sleep Room: \`${getContent(sleep)}\``)
                embed.addField("❯ Kanal Sıralaması (" + channelSize + " kanalda bulunmuş)", channels.join("\n"), true)
              }
            }
            Data.findOne({ user: user.id }, (err, rese) => {
              if (!rese) return message.channel.send("<@" + user.id + "> kişisinin kayıtlı ses verisi yok bu yüzden bilgileri gönderemiyorum.")
              let toplammessage = [];
              let mesajKanallar = [];
              for (var [key, value] of rese.channels) {
                if (message.guild.channels.cache.has(key)) {
                  mesajKanallar.push({ kanal: key, mesaj: value });
                }
                toplammessage.push(value);
              }
    
              let mesajLar = mesajKanallar.sort(function (a, b) {
                return b.mesaj - a.mesaj;
              });
              mesajLar.length = 10;
              let tok = 0;
              let array = [];
              let nume = 1
              for (tok in mesajLar) {
                array.push(`\`${nume++}.\`` +
                  " " + capitalizeIt(message.guild.channels.cache.get(mesajLar[tok].kanal).name.replace("#", " ").replace(/-/g, " ")) + ": `" + mesajLar[tok].mesaj + "`"
                );
              }
              embed.addField("❯ Mesaj Bilgisi", `\`•\` Toplam: \`${toplammessage.reduce((a, b) => a + b)}\`\n\`•\` 24 Saat: \`0\`\n\`•\` 72 Saat: \`0\`\n\`•\` 1 Hafta: \`0\` `, false)
              embed.addField("❯ Mesaj Sıralaması (Toplam: " + toplammessage.reduce((a, b) => a + b) + ")", array.join("\n"), false)
              message.channel.send(embed).catch(e => message.channel.send(`${message.author} bir sorun oluştu... Lütfen ses kanalından çıkıp tekrar girdikten sonra komutu uygulayabilir misin? Merak etme verilerin kaybolmayacak!`))
            })
          });
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

module.exports = STAT;
