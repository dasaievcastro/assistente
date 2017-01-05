var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //hello();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
    }
};

angular.module('assistente',[]);

artyom.initialize({
    lang:"pt",// A lot of languages are supported. Read the docs !
    continuous:true,// recognize 1 command and stop listening !
    listen:false, // Start recognizing
    debug:false, // Show everything in the console
    speed:1 // talk normally
});

var action = '';
var aviso = 0
function hello(){
    var time = new Date().getHours();
    var msn = 'Bom dia';
    if(time>12){
        msn='Boa Tarde'
    }
    if(time>18){
        msn='Boa noite'
    }
    msn=msn+', como posso ajudá-lo?'
    artyom.say(msn);
}

function erro(){
    var msn="Já escutei. Calma, para de doença!"
    artyom.say(msn);

}

function executAction(funcao,ultimafuncao){
    if(action!=ultimafuncao || ultimafuncao!='hello'){
        action=ultimafuncao
        funcao;
        aviso=0
    }else{
        if(aviso!=1){
            erro();
            aviso=1;
        }
    }
}

function time(){
    artyom.say(new Date().toLocaleString())
}

function likes(word){

    var msn = "Eu não gosto de "+word+". Eu sou virtual, não se esqueça!"

    artyom.say(msn)

}

function me(tipo){
    var msn="";
    if(tipo==1){
        msn = "Eu fui criado no dia 05 de janeiro de 2017."
    }else if(tipo==2){
        msn="Meu nome é benjamin. E o seu?"
    }

    artyom.say(msn)
}

function answer(name){
    var msn = "Prazer em te conhecer "+name+"."
    artyom.say(msn)
}

function profession(){
    var msn = "Eu escuto o que você fala e tento encontrar uma resposta."
    artyom.say(msn)
}

function reader(words){
    switch (words){
        case "text 1":
            msn = "esse é o livro um de teste";
            break;
        default:
            msn = "Eu não tenho esse livro, mas em breve irei adicioná-lo"
    }
    artyom.say(msn)
}

function opinion(){
    var msn = "Eu não tenho opinião sobre você. Isso demora tempo, e estamos apenas nos conhecendo"
    artyom.say(msn)
}

var commands = {
    'Hello': function() {
        executAction(hello,'hello')
    },
    'What time is it': function(){
        executAction(time,'time')
    },
    'How are you': function(word){
        executAction(likes(word),'like')
    },
    'What is your name': function(){
        executAction(me(2),'me')
    },
    'How old are you': function(){
        executAction(me(1),'me')
    },
    'My name is *name': function(name){
        executAction(answer(name),'name')
    },
    'What do you do': function(){
        executAction(profession(),'profession')
    },
    'Speak *words': function(words){
        executAction(reader(words),'speak')
    },
    'What do you think about me': function(){
        executAction(opinion(),'opinion')
    }
};

annyang.addCallback('resultNoMatch', function() {
    var msn = "Não entendi"
    artyom.say(msn)
});


annyang.debug();
// Add our commands to annyang
annyang.addCommands(commands);

// Start listening. You can call this here, or attach this call to an event, button, etc.
annyang.start();


