"use strict";
var _a, _b, _c;
const GREETING = `${bold('====== alimovlex.github.io ======')}

Welcome to my homepage.
Feel free to enter commands. If you need help, 
type ${colored("help", "cyan")}.
`;
const HELP_TEXT1 = `
${bold('====== alimovlex.github.io ======')}

${colored('Commands:', 'yellow')}
`;
const HELP_TEXT2 = `
${colored("How to run commands?", "yellow")}
    Just type one of the commands listed above
    and press ${colored("Enter", "cyan")}
`;
const ABOUT_TEXT = `
${bold("====== About Me ======")}

Hi, I'm Alex!

I'm Mobile ${colored("C/C++", "blue")} Developer & ${colored("Linux", "blue")} zealot.
My primary languages are ${colored("C/C++, Objective-C/C++, Swift", "blue")}.
Besides, I am facile with ${colored("WebSocket, WebRTC, TCP/IP, SocketIO, Bluetooth, BLE, CMake, Make", "blue")}.
Furthermore, I am familiar with virtual machines setup and administration through the ${colored("KVM, QEMU, Virt-Manager", "blue")} hypervisor.
Additionally, I am capable with ${colored("wireshark, netcat, nmap, tcpdump, netstat", "blue")} network utilities.
By the way, I use Arch Linux. 

The list of projects can be accessed, if you type ${colored('projects', 'cyan')} into the console.
The list of socials can be accessed, if you type ${colored('socials', 'cyan')} into the console.
`;
const SOCIALS_TEXT = `
${bold("My social media profiles:")}
${colored("*", "green")} GitHub:  ${link("alimovlex", "https://github.com/alimovlex")}
${colored("*", "green")} Medium: ${link("alimovlex", "https://alimovlex.medium.com")}
`;
const FETCH_TEXT = `
                   *.                          ${bold('alimovlex@Metaverse')}
               **********          ****        ----------------
           ****************************,       ${colored('Scripting Languages', 'magenta')}: Bash 
        ****%%%%%%%%%%%%%%%%%%%%%%%*****       ${colored('Programming Languages', 'magenta')}: C/C++/Assembly x86_64, Objective-C/C++, Swift
       *****%.      %  %%, /%%  %%%******      ${colored('OS', 'magenta')}: Antix Linux
       *****%.  %%%%%%  %   %  %%%%******      ${colored('WM', 'magenta')}: Fluxbox
      .*****%.     %%%    %    %%%%****        ${colored('Shell', 'magenta')}: zsh  
      ******%.  %%%%%%%  (%*  %%%%%**          ${colored('Editor', 'magenta')}: VSCode, vim, nano
      ******%%%%%%%%%%%%%%%%%%%%%%%            ${colored('Interests', 'magenta')}: Linux, Android, Embedded, IoT 
     *******%%%%%%%%%%%%%%%%%%%%%%%*****,      ${colored('Sandbox', 'magenta')}: https://github.com/alimovlex/Sandbox_DevSlopes.git
    ,*******%%%%%%%%%%%%%%%%%%%%%%%*******    
     *******%%________%%%%%%%%%%%%%******       
        ****%%%%%%%%%%%%%%%%%%%%%%%*****       ${bold('contacts')}
            **********  ****************       --------
                                     *.        ${colored('Email', 'blue')}: alimovlex(at)seznam.cz
`;

const ERROR_COMMAND = {
    id: '',
    description: '',
    expectedArgs: 0,
    execute: function (term, args) {
        term.append_colored("/bin/sh: command not found: " + args[0], "red");
        return false;
    }
};
const COMMANDS = [
    {
        id: 'clear',
        description: 'Clears the Terminal.',
        expectedArgs: 1,
        execute: function (term, args) {
            if (args.length == this.expectedArgs) {
                term.clear();
                return true;
            }
            else {
                term.append_colored("clear: unexpected argument '" + args[1] + "'", "red");
                return false;
            }
        }
    },
    {
        id: 'help',
        description: 'Displays this help text',
        expectedArgs: 1,
        execute: function (term, args) {
            if (args.length == this.expectedArgs) {
                term.append(HELP_TEXT1);
                term.append(command_list());
                term.append(HELP_TEXT2);
                return true;
            }
            else {
                term.append_colored("help: unexpected argument '" + args[1] + "'", "red");
                return false;
            }
        }
    },
    {
        id: 'about',
        description: 'Displays some information about me and my projects',
        expectedArgs: 1,
        execute: function (term, args) {
            if (args.length == this.expectedArgs) {
                term.append(ABOUT_TEXT);
                return true;
            }
            else {
                term.append_colored("about: unexpected argument '" + args[1] + "'", "red");
                return false;
            }
        }
    },
    {
        id: 'socials',
        description: 'Displays a list of my social media profiles',
        expectedArgs: 1,
        execute: function (term, args) {
            if (args.length == this.expectedArgs) {
                term.append(SOCIALS_TEXT);
                return true;
            }
            else {
                term.append_colored("socials: unexpected argument '" + args[1] + "'", "red");
                return false;
            }
        }
    },
    {
        id: 'projects',
        description: 'Displays a list of some of my projects I\'ve created so far',
        expectedArgs: 1,
        execute: function (term, args) {
            term.append_colored('Coming soon...', 'orange');
            return false;
        }
    },
    {
        id: 'fetch',
        description: 'Displays a neofetch-like status information',
        expectedArgs: 1,
        execute: function (term, args) {
            if (args.length == this.expectedArgs) {
                term.append(FETCH_TEXT);
                return true;
            }
            else {
                term.append_colored("fetch: unexpected argument '" + args[1] + "'", "red");
                return false;
            }
        }
    }
];
function command_list() {
    let str = '';
    COMMANDS.forEach((cmd) => str += colored('*', 'green') + ' ' + colored(cmd.id, 'cyan') + ': ' + cmd.description + '\n');
    return str;
}
function find_command(id) {
    for (let i = 0; i < COMMANDS.length; i++) {
        if (COMMANDS[i].id == id)
            return COMMANDS[i];
    }
    return ERROR_COMMAND;
}
function link(label, link) {
    return '<a href="' + link + '"><span class=link>' + label + '</span></a>';
}
function bold(str) {
    return '<span class=bold>' + str + '</span>';
}
function colored(str, color) {
    return '<span style=\"color:' + get_color(color) + '\">' + str + "</span>";
}
function get_color(color) {
    const COLOR_MAP = {
        red: '#be100e',
        green: '#8ce10b',
        blue: '#008df8',
        magenta: '#f07178',
        yellow: '#ffe35b',
        cyan: '#00d8eb',
        orange: '#e8863c',
    };
    return COLOR_MAP[color];
}
class Terminal {
    constructor(elem_id) {
        this.prompt_fmt = "[%u@%h %d]$ ";
        this.current_dir = "~";
        this.current_user = "user";
        this.current_host = "localhost";
        this.input = "";
        let el = document.getElementById(elem_id);
        this.elem = el;
        this.elem.setAttribute("contentEditable", "true");
        this.elem.addEventListener("oncut", e => e.preventDefault(), false);
        this.elem.addEventListener("onpaste", e => e.preventDefault(), false);
        this.elem.addEventListener('keypress', e => this.update(e));
        this.elem.addEventListener('keydown', e => this.update(e));
        this.elem.addEventListener('click', e => this.updateCursor());
        this.append(GREETING);
        this.prompt();
        this.updateCursor();
    }
    update(e) {
        if (e.key == 'Enter') {
            this.execute(this.input);
            this.input = "";
            this.prompt();
            e.preventDefault();
        }
        else if (e.key == 'Backspace') {
            if (this.input.length > 0) {
                this.input = this.input.slice(0, this.input.length - 1);
                this.elem.innerHTML = this.elem.innerHTML.slice(0, this.elem.innerHTML.length - 1);
            }
            e.preventDefault();
        }
        else if (e.key.length == 1 && !e.altKey && !e.ctrlKey && !e.metaKey) {
            this.input += e.key;
            this.append(e.key);
            e.preventDefault();
        }
        this.updateCursor();
    }
    execute(str) {
        if (str.trim().length == 0)
            return;
        this.newline();
        let args = str.trim().split(' ');
        find_command(args[0]).execute(this, args);
    }
    parse_prompt() {
        return this.prompt_fmt
            .replace("%d", this.current_dir)
            .replace("%u", this.current_user)
            .replace("%h", this.current_host);
    }
    prompt() {
        if (this.elem.innerHTML !== '')
            this.newline();
        this.append(this.parse_prompt());
    }
    append_colored(str, color) {
        this.elem.innerHTML += '<span style=\"color:' + color + '\">' + str + "</span>";
    }
    append(str) {
        str = str.replace(/\n/g, '<br/>');
        this.elem.innerHTML += str;
    }
    newline() {
        this.elem.innerHTML += '<br/>';
        this.elem.scrollTop = this.elem.scrollHeight;
    }
    clear() {
        this.elem.innerHTML = "";
    }
    updateCursor() {
        let range = document.createRange();
        let sel = window.getSelection();
        range.setStart(this.elem.childNodes[this.elem.childNodes.length - 1], this.parse_prompt().length + this.input.length);
        range.collapse(true);
        sel === null || sel === void 0 ? void 0 : sel.removeAllRanges();
        sel === null || sel === void 0 ? void 0 : sel.addRange(range);
        this.elem.scrollTop = this.elem.scrollHeight;
    }
}
const term = new Terminal('terminal');
(_a = document.getElementById('socials-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
    term.append("socials");
    find_command("socials").execute(term, ["socials"]);
    term.prompt();
});
(_b = document.getElementById('help-button')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
    term.append("help");
    find_command("help").execute(term, ["help"]);
    term.prompt();
});
(_c = document.getElementById('about-button')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', (e) => {
    term.append("about");
    find_command("about").execute(term, ["about"]);
    term.prompt();
});
//# sourceMappingURL=index.js.map