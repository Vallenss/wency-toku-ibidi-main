const Command = require("../base/Command.js");
const data = require("../models/voice.js")
const Data = require("../models/messages.js")
const Discord = require("discord.js")
class TOP extends Command {
    constructor(client) {
        super(client, {
            name: "top",
            aliases: ["top"]
        });
    }

    async run(message, args, client) {
      let yasaklii = [
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
          if (yasaklii.includes(message.channel.id)) return;
    
          let embede = new Discord.MessageEmbed();
          embede.setColor(message.member.displayHexColor);
          embede.setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
          let declarearr = []
    
          let map = new Map([
            ["1", "Toplam"],
            ["2", "Kayıt Odaları"],
            ["3", "Vampir / Köylü"],
            ["4", "Doğruluk / Cesaret"],
            ["5", "Public Odalar"],
            ["6", "Stream Odaları"],
            ["7", "Secret of Valeria"],
            ["8", "Sleep Room"],
            ["9", "Sorun Çözme"],
            ["10", "Müzik Odaları"],
            ["11", "Oyun Odaları"]
          ])
    
          let roleMap = new Map([
            ["--rookies", "784025601304297522"],
            ["--excellent", "727881525491925022"],
            ["--eternal", "727881547528798219"],
            ["--throne", "727881549671956560"],
            ["--moon", "727881546836607106"],
            ["--shadows", "727881526175334429"],
            ["--proteger", "727881522668896350"],
            ["--kronos", "727881522236883004"],
            ["--lotis", "729466637094354974"],
            ["--legion", "727881520915808308"],
            ["--alpha", "730213053747953725"],
            ["--majesty", "727881519456321616"],
            ["--blackthrone", "743255932137373820"],
            ["--lord", "758415750213664778"],
            ["--diamente", "735827989127888966"],
            ["--paradise", "727881518726381589"]
          ])
    
          let number = args.join(" ").split(" ");
          let iterator = []
          let roleFilter = []
          await number.map(x => {
    
            if (map.has(x) || message.guild.channels.cache.has(x)) {
              iterator.push(map.get(x) || message.guild.channels.cache.get(x).id)
            }
            if (roleMap.has(x.toLowerCase())) {
              roleFilter.push(roleMap.get(x.toLowerCase()))
            }
    
          })
          let mmt = "";
          for (let [k, v] of map) {
            mmt = mmt + `\`${k}.\` ${v}\n`
          }
    
          let mms = "";
          for (let [k, v] of roleMap) {
            mms = mms + `\`${k}\`: <@&${v}>\n`
          }
    
    
          if (iterator.length == 0 || iterator.length > 5) {
            embede.setDescription(`Lütfen en az 1, en fazla 5 tane kategori seçin.\n\n${mmt}\n${mms}\nÖrnek kullanım:\n\`!top 1 --peon\`\n\`!top 4 1 --silvers --rivers\`\n\`!top <kanalID> --emperor\`\n\`!top 1 --varys 2 --warrior\``)
            return message.channel.send(embede)
          }
    
    
          await data.find({}, async (err, rev) => {
            let numb = 0
            let ast = rev.filter(x => message.guild.members.cache.has(x.user))
            ast = ast.filter(x => !message.guild.members.cache.get(x.user).user.bot)
            if (roleFilter.length > 0) {
              ast = ast.filter(x => roleFilter.some(roleID => message.guild.members.cache.get(x.user).roles.cache.has(roleID)) == true)
            }
            for (let i = 0; i < ast.length; i++) {
              let res = ast[i]
    
              if (!res.state !== "") {
                if (res.channels.has(res.state)) {
                  res.channels.set(res.state, res.channels.get(res.state) + Date.now() - new Date(res.start).getTime())
                } else {
                  res.channels.set(res.state, Date.now() - new Date(res.start).getTime())
                }
              }
              let arre = [];
    
              for (let [k, v] of res.channels) {
    
                if (message.guild.channels.cache.has(k)) {
                  if (v && v > 10000 && isNaN(v) == false) {
                    arre.push({ channel: k, duration: v })
                  }
                }
              }
              let kayıts = arre.filter(x => message.guild.channels.cache.get(x.channel).parentID === "777158411896356894").map(x => x.duration)
              let soruns = arre.filter(x => message.guild.channels.cache.get(x.channel).parentID === "778296307248136232").map(x => x.duration)
              let publicss = arre.filter(x => message.guild.channels.cache.get(x.channel).parentID === "775722354605162497" && !["727881654021914644"].includes(x.channel)).map(x => x.duration)
              let vks = arre.filter(x => message.guild.channels.cache.get(x.channel).parentID === "778278684347858984").map(x => x.duration)
              let streams = arre.filter(x => message.guild.channels.cache.get(x.channel).parentID === "778290504290402324").map(x => x.duration)
              //let terapis = arre.filter(x => message.guild.channels.cache.get(x.channel).parentID === "767355663407120394").map(x => x.duration)
              let dcs = arre.filter(x => message.guild.channels.cache.get(x.channel).parentID === "778275857118658560").map(x => x.duration)
              let amonguss = arre.filter(x => message.guild.channels.cache.get(x.channel).parentID === "778274435584491560").map(x => x.duration)
              let games = arre.filter(x => message.guild.channels.cache.get(x.channel).parentID === "778274435584491560").map(x => x.duration)
              let secrets = arre.filter(x => message.guild.channels.cache.get(x.channel).parentID === "777153164532252672").map(x => x.duration)
              let müziks = arre.filter(x => message.guild.channels.cache.get(x.channel).parentID === "780490181362319370").map(x => x.duration)
              let sleeps = arre.filter(x => x.channel === "727881654021914644").map(x => x.duration)
              kayıts.length > 0 ? kayıts = parseInt(kayıts.reduce((a, b) => a + b)) : kayıts = 0
              soruns.length > 0 ? soruns = parseInt(soruns.reduce((a, b) => a + b)) : soruns = 0
              publicss.length > 0 ? publicss = parseInt(publicss.reduce((a, b) => a + b)) : publicss = 0
              streams.length > 0 ? streams = parseInt(streams.reduce((a, b) => a + b)) : streams = 0
              amonguss.length > 0 ? amonguss = parseInt(amonguss.reduce((a, b) => a + b)) : amonguss = 0
              vks.length > 0 ? vks = parseInt(vks.reduce((a, b) => a + b)) : vks = 0
              dcs.length > 0 ? dcs = parseInt(dcs.reduce((a, b) => a + b)) : dcs = 0
              games.length > 0 ? games = parseInt(games.reduce((a, b) => a + b)) : games = 0
              secrets.length > 0 ? secrets = parseInt(secrets.reduce((a, b) => a + b)) : secrets = 0
              müziks.length > 0 ? müziks = parseInt(müziks.reduce((a, b) => a + b)) : müziks = 0
              sleeps.length > 0 ? sleeps = parseInt(sleeps.reduce((a, b) => a + b)) : sleeps = 0
              let toplams = parseInt(kayıts + games + secrets + dcs + vks + publicss + soruns)
    
              async function declare(strname, duration) {
                if (duration / 3600000 > 1) {
                  let val = parseInt(duration / 3600000)
                  let durationn = parseInt((duration - (val * 3600000)) / 60000)
    
                  declarearr.push({ user: res.user, name: strname, duration: duration, message: `\`${val} saat, ${durationn} dakika\`` })
                } else {
                  let durationn = parseInt(duration / 60000)
    
                  declarearr.push({ user: res.user, name: strname, duration: duration, message: `\`${durationn} dakika\`` })
    
    
                }
    
              }
              for (let i = 0; i < iterator.length; i++) {
                if (message.guild.channels.cache.has(iterator[i])) {
                  let sleepy = arr.filter(x => x.channel === iterator[i]).map(x => x.duration)
                  declare(message.guild.channels.cache.get(iterator[i]).name, sleepy, true)
                }
              }
    
              await declare("Toplam", toplams, true)
              await declare("Kayıt Odaları", kayıts, false)
              await declare("Vampir / Köylü", vks, false)
              await declare("Doğruluk / Cesaret", dcs, false)
              await declare("Public Odalar", publicss, false)
              await declare("Stream Odaları", streams, false)
              await declare("Secret of Valeria", secrets, true)
              await declare("Sleep Room", sleeps, false)
              await declare("Sorun Çözme", soruns, true)
              await declare("Müzik Odaları", müziks, false)
              await declare("Oyun Odaları", games, false)
              await declare("Kategorize Edilmemiş", toplams - numb, false)
            }
    
            if (iterator.length == 1) number = 35
            if (iterator.length == 2) number = 17
            if (iterator.length == 3) number = 12
            if (iterator.length == 4) number = 8
            if (iterator.length == 5) number = 7
            let hadi = [];
            let buffertxt = ""
            async function top(string, number) {
              let str;
              if (message.guild.channels.cache.has(string)) {
                str = message.guild.channels.cache.get(string).name
              } else {
                str = string
              }
              let at = declarearr.filter(x => x.name === str).sort(function (a, b) {
                return b.duration - a.duration
              }).map(x => x)
              let find = at.find(x => x.user === message.author.id)
              let buffertxt = ""
              if (find) {
                if (at.indexOf(find) > number - 1) {
                  buffertxt = `${find.user === message.author.id ? "**" : ""} ${at.indexOf(find) + 1}. <@${find.user}>: ${find.message} ${find.user === message.author.id ? "**  (Siz)" : ""}`
                } else {
                  buffertxt = ``
                }
              } else {
                buffertxt = ``
              }
              let ar = at.map(x => `${x.user === message.author.id ? "**" : ""} ${at.indexOf(x) + 1}. <@${x.user}>: ${x.message} ${x.user === message.author.id ? "**  (Siz)" : ""}`).slice(0, number)
              if (buffertxt !== "") ar.push(`${buffertxt}`)
              hadi.push({ name: str, members: ar })
            }
    
            for (let i = 0; i < iterator.length; i++) {
              top(iterator[i], number)
            }
    
            let metin = "";
            for (let i = 0; i < hadi.length; i++) {
              metin = metin + `${hadi[i].name} | Sıralama\n${hadi[i].members.map(x => `${x}`).join("\n")}\n\n Sıralamalar ${roleFilter.map(x => `<@&${x}>`).join(", ")} rolleri arasında gerçekleşmiştir.\n\n`
            }
            message.react("787784830305697792").then(async (m) => {
              async function wait() {
                return new Promise((res, rej) => {
                  setTimeout(() => {
                    embede.setDescription(metin)
                    message.channel.send(embede)
                    message.reactions.removeAll()
                  }, 1500)
                })
              }
              await wait()
            })
    
    
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

module.exports = TOP;
