
from flask import Flask, request, abort, render_template, session,url_for,redirect,g,send_from_directory,send_file,Blueprint
from flask_login import LoginManager, login_user, logout_user, login_required,current_user,AnonymousUserMixin
bot = Blueprint("bot",__name__)

@bot.route("/")
def test2():
    return "521215"


@bot.route('/connect', methods=['GET', 'POST'])
@login_required
def connect():
    if request.method == 'POST':
        # print(current_user._id)
        # username = current_user.username
        # ch_sc = request.form.get('ch_sc')
        # ch_ac_tk = request.form.get('ch_ac_tk')
        # basic_id = request.form.get('basic_id')
        # pfa_tk = request.form.get('pfa_tk')
        # vf_tk = request.form.get('vf_tk')
        # update_connect(username, ch_sc,ch_ac_tk,basic_id,pfa_tk,vf_tk)
        return redirect(url_for('home'))
    elif request.method == 'GET':
        # gg = find_bot(current_user.username)
        # print(gg[0]["name_bot"])
        return render_template('connect.html')