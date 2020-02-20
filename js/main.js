var API_PREFIX = 'https://api.github.com/repos/ANTFOR7717/directory-antfor.me/git',
    e = "guest@antfor.me";

var commandText = function(text) {
    return "[[g;#EEEEEE;]" + text + "]";
};
var commandTextb = function(text) {
    return "[[g;#AAAAAA;]" + text + "]";
};

var GitHub = new ( function() {
    this.fs = {};
    this.loaded = false;
    this.stack = [];

    this.getCurrentPath = function(){
        if(this.stack.length === 0)
            return '~/';
        return this.stack.join('/')
    },    
    this.getCurrentWorkingDirectory = function() {
        if(this.stack.length === 0)
            return this.fs;

        let fs = this.fs;
        for(const i in this.stack) {
            fs = fs[this.stack[i]];
        }
        return fs;
    };

    const self = this;
    $.getJSON(API_PREFIX + '/refs/heads/master', function(data, textStatus, jqXHR){
    //$.getJSON('data/master.json', function(data, textStatus, jqXHR){
        const sha = data.object.sha;
        $.getJSON(API_PREFIX + '/trees/'+sha+'?recursive=1', function(data, textStatus, jqXHR){
        let i;
//$.getJSON('data/tree.json', function(data, textStatus, jqXHR){
            for(i in data.tree) {
                const item = data.tree[i];
                const paths = item.path.split('/');

                let fs = self.fs;
                for(i = 0; i< paths.length; i++) {
                    const path = paths[i];

                    if(!fs.hasOwnProperty(path)) {
                       fs[path] = {};
                    } else {
                       fs = fs[path]
                    }
                       
                    if (i === paths.length - 1) {
                        item.path = path;
                        fs[path] = item;
                    }
                }
            }
            self.loaded = true;
        });
    });
})();

var App = {
    echo: function(text) {
        this.echo(text);

        if(ga !== undefined) ga('send', 'event', 'echo', GitHub.getCurrentPath(), 'text', text);
    },
    help: function() {
        this.echo("");
        this.echo("Available commands:");
        this.echo("");
        this.echo("\t[[b;#26761F;]about]       information about this page.");
        this.echo("\t[[b;#26761F;]contact]     display contact information.");
        this.echo("\t[[b;#26761F;]cat]         view text files in directories.");
        this.echo("\t[[b;#26761F;]whoami]      display my short brief.");
        this.echo("\t[[b;#26761F;]help]        this help screen.");
        this.echo("\t[[b;#26761F;]skills]      display showcase-able skills.");
        this.echo("\t[[b;#26761F;]clear]       clears information on the screen.");
        this.echo("");
        this.echo("some other basic Linux commands are available: | [[b;#26761F;]rm] | [[b;#26761F;]cd] | [[b;#26761F;]id] | [[b;#26761F;]sudo] | [[b;#26761F;]startx] | [[b;#26761F;]echo] | [[b;#26761F;]restart] ");
        this.echo("");

        if(ga !== undefined) ga('send', 'event', 'help', GitHub.getCurrentPath());
    },
    whoami: function() {
        this.echo("");
        this.echo("Hello, my name is Anthony (aka [[g;#B2D100;]Anthony Forest]), I'm owner of several niche e-commerce websites and a private web development firm.");
        this.echo("I'm a programmer, and Electronic Engineer (AAS). I love Open Source and passionate about contributions to Open Source projects.");
        this.echo("My technical summary:");
        this.echo("");
        this.echo(commandTextb("\t- Have strong knowledge about Linux operating system and open source software."));
        this.echo("");
        this.echo(commandTextb("\t- Responsible for day-to-day defense of our network, servers."));
        this.echo("");
        this.echo(commandTextb("\t- Experienced with web application development, specialist with PHP/MySQL. Can develop desktop/web application with Java/Python."));
        this.echo("");
        this.echo(commandTextb("\t- Able to make mobile apps using many different technologies (Native/Ionic)"));
        this.echo("\nI'm available to work as freelancer, so feel free to get in touch via [[b;#26761F;]contact] command");
        this.echo("");

        if(ga !== undefined) ga('send', 'event', 'whoami', GitHub.getCurrentPath());
    },
    contact: function() {
        this.echo("");
        this.echo("Get in touch via:");
        this.echo("Email:   " + "anthony.forest@engineer.com");
        //this.echo("Twitter: @rgv151");
        //this.echo("Google+: +rgv151");
        this.echo("");

        if(ga !== undefined) ga('send', 'event', GitHub.getCurrentPath(), 'contact');
    },

    skills: function() {
        this.echo("");
        this.echo( "|  [[g;#B2D100;]Legend:]                                                              |");
        this.echo( "|  [[g;#00A6FC;]#] [[g;#AAAAAA;]Perfect]      (Rarely needs to view the documentation)              |");
        this.echo( "|  [[g;#5BD100;]#] [[g;#AAAAAA;]Expert]       (Hardly needs to view the documentation)              |");
        this.echo( "|  [[g;#B2D100;]#] [[g;#AAAAAA;]Proficient]   (Occasionally needs to view the documentation)        |");
        this.echo( "|  [[g;#D13F00;]#] [[g;#AAAAAA;]Familiarity]  (Often needs to view the documentation)               |");
        this.echo("|\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   |");
        this.echo("|  [[g;#B2D100;]Statistical Computing]t\t\t\t\t\t\t\t\t\t\t\t   |");
        this.echo("|  " + commandText('Python') + "                ##[[g;#5BD100;]#########################]                ##  |");
        this.echo("|  " + commandText('bash') + "                  ##[[g;#5BD100;]###################]                      ##  |");
        this.echo("|  " + commandText('Java') + "                  ##[[g;#B2D100;]#########]                                ##  |");
        this.echo("|  " + commandText('C++') + "                   ##[[g;#B2D100;]#####]                                    ##  |");
        this.echo("|  " + commandText('Perl') + "                  ##[[g;#D13F00;]####]                                     ##  |");
        this.echo("|  " + commandText('Go') + "                    ##[[g;#D13F00;]###]                                      ##  |");
        this.echo("|\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   |");
        this.echo("|  [[g;#B2D100;]Frontend Technologies]\t\t\t\t\t\t\t\t\t\t\t\t|");
        this.echo("|  " + commandText('Javascript') + "            ##[[g;#5BD100;]##########################]               ##  |");
        this.echo("|  " + commandText('CSS') + "                   ##[[g;#B2D100;]#########################]                ##  |");
        this.echo("|  " + commandText('HTML5') + "                 ##[[g;#B2D100;]########################]                 ##  |");
        this.echo("|  " + commandText('PHP') + "                   ##[[g;#D13F00;]##########]                               ##  |");
        this.echo("|\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   |");
        // this.echo("|  " + commandText("Database"));
        this.echo("|  [[g;#B2D100;]Web Frameworks]\t\t\t\t\t\t\t\t\t\t\t           |");
        this.echo("|  " + commandText('React') + "                 ##[[g;#5BD100;]###########]                              ##  |");
        this.echo("|  " + commandText('Angular') + "               ##[[g;#5BD100;]#########]                                ##  |");
        this.echo("|  " + commandText('Bootstrap') + "             ##[[g;#B2D100;]######]                                   ##  |");
        this.echo("|  " + commandText('Django') + "                ##[[g;#B2D100;]#####]                                    ##  |");
        this.echo("|  " + commandText('Ionic') + "                 ##[[g;#B2D100;]####]                                     ##  |");
        this.echo("|  " + commandText('ASP.NET') + "               ##[[g;#D13F00;]##]                                       ##  |");
        this.echo("|\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   |");

        this.echo("|  [[g;#B2D100;]Cloud Computing]\t\t\t\t\t\t\t\t\t\t\t          |");
        this.echo("|  " + commandText('AWS') + "                   ##[[g;#5BD100;]###########]                              ##  |");
        this.echo("|  " + commandText('GCP') + "                   ##[[g;#5BD100;]###########]                              ##  |");
        this.echo("|  " + commandText('Azure') + "                 ##[[g;#B2D100;]#########]                                ##  |");
        this.echo("|  " + commandText('IBM') + "                   ##[[g;#B2D100;]#####]                                    ##  |");
        this.echo("|  " + commandText('Heroku') + "                ##[[g;#D13F00;]###]                                      ##  |");
        this.echo("|\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   |");
        // this.echo("|");
        this.echo("|  [[g;#B2D100;]Databases]\t\t\t\t\t\t\t\t\t\t\t                |");
        this.echo("|  " + commandText('MySQL') + "                 ##[[g;#B2D100;]####################]                     ##  |");
        this.echo("|  " + commandText('MongoDB') + "               ##[[g;#D13F00;]#########]                                ##  |");
        this.echo("|  " + commandText('Oracle') + "                ##[[g;#D13F00;]#####]                                    ##  |");
        this.echo("|\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   |");
        this.echo("|  [[g;#B2D100;]Operating Systems]\t\t\t\t\t\t\t\t\t\t\t        |");
        // this.echo("|  " + commandText("Native Mobile / Game Dev"));
        // this.echo("|");
        this.echo("|  " + commandText('Linux') + "                 ##[[g;#5BD100;]################################]         ##  |");
        this.echo("|  " + commandText('MAC OS') + "                ##[[g;#B2D100;]######################]                   ##  |");
        this.echo("|  " + commandText('Windows') + "               ##[[g;#B2D100;]#####################]                    ##  |");
        this.echo("|\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   |");
        this.echo("|  [[g;#B2D100;]Languages]\t\t\t\t\t\t\t\t\t\t\t                |");
        // this.echo("|");
        this.echo("|  " + commandText('English') + "               ##[[g;#00A6FC;]#########################################]##  |");
        this.echo("|  " + commandText('Spanish') + "               ##[[g;#B2D100;]#######]                                  ##  |");
        this.echo("|  " + commandText('Japanese') + "              ##[[g;#D13F00;]###]                                      ##  |");
        this.echo("");

        if(ga !== undefined) ga('send', 'event', 'skills', GitHub.getCurrentPath());
    },

    about: function() {
        this.echo("");
        this.echo("This page built with <a href='http://terminal.jcubic.pl/' target='_blank'>jQuery Terminal Emulator</a> plugin, and hosted by <a href='http://pages.github.com' target='_blank'>GitHub Pages<a/>.", {raw:true});
        this.echo("");
        if(ga !== undefined) ga('send', 'event', 'about', GitHub.getCurrentPath());
    },
    id: function(){
        this.echo("uid=1000(guest) gid=1000(guest)");

        if(ga !== undefined) ga('send', 'event', 'id', GitHub.getCurrentPath());
    },
    rm: function(path){
        this.echo("[[b;#FF0000;]- bash: rm: cannot remove " + path + ": Permission denied]");

        if(ga !== undefined) ga('send', 'event', 'rm', GitHub.getCurrentPath());
    },
    sudo: function(command,arg){
        arg = arg || 0;

        this.echo("[[b;#FF0000;]- bash: sudo: user is not in the sudoers file" + ": this incident will be reported. ]");

        if(ga !== undefined) ga('send', 'event', 'sudo', GitHub.getCurrentPath());
    },
    restart: function(){
        location.reload();
        if(ga !== undefined) ga('send', 'event', 'restart', GitHub.getCurrentPath());
    },
    shutdown: function(){
        close();
        if(ga !== undefined) ga('send', 'event', 'shutdown', GitHub.getCurrentPath());
    },
    ls: function() {
        var wd = GitHub.getCurrentWorkingDirectory();
        for(i in wd) {
            if(typeof wd[i] == 'object') {
                var item = wd[i];
                this.echo(item.mode+'  |\t' + (item.type=='tree'?'[[b;#0A8AFF;]'+item.path+']':item.path));
            }
        }

        if(ga !== undefined) ga('send', 'event', 'ls', GitHub.getCurrentPath());
    },
    cd: function(path) {
        if(path === '..') {
            GitHub.stack.pop();
            return;
        }        
        var wd = GitHub.getCurrentWorkingDirectory();
        var item = wd[path];
        if(!item) {
            this.error("cd: " + path + ": No such file or directory");
        } else if(item.type !== 'tree') {
            this.error("cd: " + path  + ": Not a directory");
        } else {
            GitHub.stack.push(path);
        }

        if(ga !== undefined) ga('send', 'event', 'cd', GitHub.getCurrentPath(), 'path', path);
    },
    cat: function(path){
        var wd = GitHub.getCurrentWorkingDirectory();
        var item = wd[path];
        if(!item) {
            this.error("cat: " + path + ": No such file or directory");
        } else if(item.type === 'tree') {
            this.error("cat: " + path  + ": Is a directory");
        } else {
            var term = this;
            term.pause();
            $.getJSON(item.url, function(data, textStatus, jqXHR){
                var content = data.content.trim()
                if(data.encoding === 'base64')
                    content = decode64(content);
                term.echo(content); 
                term.resume();
            });
        }
        if(ga !== undefined) ga('send', 'event', 'cat', GitHub.getCurrentPath(), 'path', path);
    },
    startx: function() {
        this.error('xinit: unable to connect to X server: Resource temporarily unavailable\nxinit: server error');

        if(ga !== undefined) ga('send', 'event', 'startx', GitHub.getCurrentPath());
    }
}

jQuery(document).ready(function($) {
    $('body').terminal(App, {
        greetings: "[[bg;#26761F;]" +
            "                 __                               \n" +
            "|  /            /  |      /    /                  \n" +
            "(     _ _      (___| ___ (___ (___  ___  ___      \n" +
            "|    | | )     |   )|   )|    |   )|   )|   )\\   )\n" +
            "|    |  /      |  / |  / |__  |  / |__/ |  /  \\_/ \n" +
            "                                             __/  \n\n]" +
            "[[b;#26761F;]Hi, let's explore my little box on the Internet!]\n\nType [[g;#26761F;]whoami] to read something about me, [[g;#26761F;]skills] to view my current ability with technologies, [[b;#26761F;]ls] to explore resources on this page and [[b;#26761F;]help] if you dont know what to do next.\n",
        prompt: function(p){
            var path = '~'
            if(GitHub.stack.length > 0) {
                for(i in GitHub.stack) {
                    path+= '/';
                    path+= GitHub.stack[i]
                }
            }
            p(e + ":" + path + "# ");
        },
        onBlur: function() {
            // prevent loosing focus
            return false;
        },
        tabcompletion: true
    });
});
