from urllib import response
from flask import Flask, jsonify , request, render_template 
import os
import json
import numpy as np
import pandas as pd
import functions as func
import matplotlib.pyplot as plt
import cv2
app = Flask( __name__ )

@app.route("/" ,methods=['POST','GET'])
def welcomepage():
    if request.method == 'POST':
        return render_template('index.html')
    else:
        return render_template('index.html')

@app.route("/importdata" ,methods=['POST','GET'])
def importdata():
    if request.method == 'POST':
        value = request.files.get('imported-data')
        print(value.filename)
        importedsig = pd.read_csv('./pathLinkerData/'+value.filename)
        func.weighted_graph(importedsig)
        func.spanningtree(importedsig,len(importedsig))
        return render_template('index.html')
    else:
        return render_template('index.html')

@app.route("/choosedata" ,methods=['POST','GET'])
def choosedata():
    if request.method == 'POST':
    
        data = request.json['datasent']
        chosendata=json.dumps(data).split('\\')[4].rstrip(json.dumps(data).split('\\')[4][-1])
        value = request.json['value']
        df= pd.read_csv('./pathLinkerData/'+chosendata)
        #print(int(value))
        func.choosedata(df,int(value))
        func.spanningtree(df,int(value))
        return render_template('index.html')
    else:
        return render_template('index.html')

@app.route("/unweighted" ,methods=['POST','GET'])
def unweighted():
    if request.method == 'POST':
        data = request.json['datasent']
        chosendata=json.dumps(data).split('\\')[4].rstrip(json.dumps(data).split('\\')[4][-1])
        df= pd.read_csv('./pathLinkerData/'+chosendata)
        func.unweighted(df,len(df))
        return render_template('index.html')
    else:
        return render_template('index.html')
@app.route("/exportadj" ,methods=['POST','GET'])
def exportadj():
    if request.method == 'POST':
        data = request.json['datasent']
        chosendata=json.dumps(data).split('\\')[4].rstrip(json.dumps(data).split('\\')[4][-1])
        df= pd.read_csv('./pathLinkerData/'+chosendata)
        func.export_adj_matrix(df,len(df))
        return render_template('index.html')
    else:
        return render_template('index.html')

@app.route("/protein" ,methods=['POST','GET'])
def protein():
    if request.method == 'POST':
        data = request.files.get('imported-protein')
        print(data.filename)
        importedsig = pd.read_csv('./pathLinkerData/'+data.filename)
        func.histogram(importedsig,len(importedsig))
        return render_template('index.html')
    else:
        return render_template('index.html')

@app.route("/setproteins" ,methods=['POST','GET'])
def setprotein():
    if request.method == 'POST':
        data = request.json['datasent']
        value = request.json['value']
        print(value)
        print(data)
        chosendata=json.dumps(data).split('\\')[4].rstrip(json.dumps(data).split('\\')[4][-1])
        df= pd.read_csv('./pathLinkerData/'+chosendata)
        plt.clf()
        func.histogram(df,int(value))
        return render_template('index.html')
    else:
        return render_template('index.html')

@app.route("/oneprotein" ,methods=['POST','GET'])
def proteins():
    if request.method == 'POST':
        data = request.json['datasent']
        protein = request.json['value']
        chosendata=json.dumps(data).split('\\')[4].rstrip(json.dumps(data).split('\\')[4][-1])
        df= pd.read_csv('./pathLinkerData/'+chosendata)
        #print(protein)
        one =func.proteindegrees(df,protein)
        return json.dumps(one)
    else:
        return render_template('index.html')
@app.route("/twoprotein" ,methods=['POST','GET'])
def twoprotein():
    if request.method == 'POST':
        data = request.json['datasent']
        protein = request.json['value']
        chosendata=json.dumps(data).split('\\')[4].rstrip(json.dumps(data).split('\\')[4][-1])
        df= pd.read_csv('./pathLinkerData/'+chosendata)
        p1 = protein.split("+",1)[0]
        p2 = protein.split("+",1)[1]
        func.shortest(df,p1,p2)
        func.dishortest(df,p1,p2)
        func.allshortest(df,p1,p2)
        #print(protein.split("+",1)[0])
        #print(protein.split("+",1)[1])
        return render_template('index.html')
    else:
        return render_template('index.html')
@app.route("/Genename" ,methods=['POST','GET'])
def Genename():
    if request.method == 'POST':
        proteinlist = request.json
        print(proteinlist)
        gene =func.UniprotID(proteinlist)
        return json.dumps(gene)
    else:
        return render_template('index.html')
if __name__ == '__main__':
    app.run(debug=True)
