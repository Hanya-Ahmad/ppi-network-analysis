import networkx as nx
import matplotlib.pyplot as plt
import pandas as pd 
import numpy as np
from unipressed import IdMappingClient
import time
from collections import Counter
import os
import csv
import cv2
def weighted_graph(df):
    G=nx.from_pandas_edgelist(df,'tail','head',edge_attr='edge_weight')
    pos=nx.spring_layout(G,k=0.3)
    plt.figure(figsize=(20,20))
    nx.draw(G,pos,node_size=200,node_color = 'yellow')
    nx.draw_networkx_edge_labels(G,pos,font_size=10 ,edge_labels=nx.get_edge_attributes(G,'edge_weight'))
    plt.savefig('./static/imgs/weightedGraph.jpg')
    #plt.show()
    return 'success'

def spanningtree(df,num):
    g = nx.Graph()
    for i in range(num):
        node=df.loc[i,:][0] # first column as node
        next_node=df.loc[i,:][1]# first column as  node
        weight=df.loc[i,:][2] # third column as edge cost/weight
        g.add_weighted_edges_from([(node,next_node,weight)])
    T = nx.minimum_spanning_tree(g)
    pos = nx.spring_layout(T)
    plt.figure(figsize=(20,20))
    nx.draw_networkx(T, pos=pos, with_labels=False,
                 node_color='y',
                 node_size= 30 )
    plt.axis('off')
    plt.savefig('./static/imgs/spanningtree.jpg')
    return 'success'
def choosedata(df,num):
    g = nx.Graph()
    for i in range(num):
        node=df.loc[i,:][0] # first column as node
        next_node=df.loc[i,:][1]# first column as  node
        weight=df.loc[i,:][2] # third column as edge cost/weight
        g.add_weighted_edges_from([(node,next_node,weight)])
    pos=nx.spring_layout(g)
    plt.figure(figsize=(20,20))
    nx.draw(g,pos,node_size=200,node_color = 'yellow')
    nx.draw_networkx_edge_labels(g,pos,font_size=10 ,edge_labels=nx.get_edge_attributes(g,'edge_weight'))
    plt.savefig('./static/imgs/weightedGraph.jpg')
    return 'success'

def unweighted(df,num):
    unweighted_Graph = nx.Graph()
    for i in range(num):
        tail=df['tail'][i] # first column as node
        head=df['head'][i]# second column as  node
        unweighted_Graph.add_edges_from([(tail,head)])
    #position nodes 
    pos = nx.spring_layout(unweighted_Graph,k=0.3)
    #create figure
    plt.figure(figsize=(20,20))
    nx.draw_networkx(unweighted_Graph, pos=pos, with_labels=False)
    plt.axis('off')
    plt.savefig('./static/imgs/unweightedGraph.jpg')
    return 'success'

def export_adj_matrix(df,num):
    unweighted_Graph_toadj = nx.Graph()
    for i in range(num):
        tail=df['tail'][i] # first column as node
        head=df['head'][i]# second column as  node
        unweighted_Graph_toadj.add_edges_from([(tail,head)])
    adjacency_matrix= nx.adjacency_matrix(unweighted_Graph_toadj)
    adj1 =pd.DataFrame(adjacency_matrix)  
    adj1.to_csv('./static/imgs/adjacency1.txt') 
    return 'success'
def histogram(df,num):
    Graph = nx.Graph()
    for i in range(num):
        tail=df['tail'][i] # first column as node
        head=df['head'][i]# second column as  node
        weight=df['edge_weight'][i] # third column as edge cost/weight
        Graph.add_weighted_edges_from([(head,tail,weight)])
    #take degrees from the network
    degree_sequence = sorted([d for n, d in Graph.degree()], reverse=True)
    #count  degree frequency
    degreeCount = Counter(degree_sequence)
    plt.figure(20,figsize=(10,10))
    
    plt.hist(degreeCount, bins='auto') #auto bin size is used
    plt.title("Degree Histogram")
    plt.xlabel("Degree")
    plt.ylabel("Nodes")
    plt.savefig('./static/imgs/histogram.jpg')
    return 'success'
def shortest(df,p1,p2):
    G = nx.from_pandas_edgelist(df, source='tail', target='head', edge_attr='edge_weight', create_using=nx.DiGraph())
    #shortest path
    path=nx.shortest_path(G,p1,p2)
    # number of nodes
    nodes= len(path)
    plt.figure(60,figsize=(10,10))
    #total cost of the path
    path_weight=nx.path_weight(G, path, 'edge_weight')
    #weight of each interaction in the path
    edges_weight=[]
    for i in range (nodes -1) :
        x= nx.get_edge_attributes(G, "edge_weight")
        s=x[(path[i], path[i+1])]
        edges_weight.append(s)
    #drawing the subnetwork 
    result_graph = G.subgraph(path)
    nx.draw(result_graph,with_labels=True , node_size=1900, width=2)
    plt.savefig('./static/imgs/shortestpath.jpg')
    return 'success'
def allshortest(df,p1,p2):
    G = nx.from_pandas_edgelist(df, source='tail', target='head', edge_attr='edge_weight', create_using=nx.DiGraph())
        #list of all shortest paths
    all_paths=list(nx.all_shortest_paths(G,p1,p2))

    save = pd.DataFrame(all_paths)
    save.to_csv('./static/imgs/allpaths.txt')
    #drawing all shortest paths
    my_set = {i for lst in all_paths for i in lst}
    s=list(my_set)
    plt.figure(61,figsize=(10,10))
    result_graph = G.subgraph(s)
    #b='blue'
    #o='orange'
    #node_color=[b,b,b,b,b,b,b,b,b,b,b,b,o,o,b,b,b,b,b,b,b,b,b,b,b]
    nx.draw_shell(result_graph,with_labels=True , node_size=2000, width=0.7 , font_size=10 )
    plt.savefig('./static/imgs/allshortestpaths.jpg')
    return 'success'
def dishortest(df,p1,p2):
    G = nx.from_pandas_edgelist(df, source='tail', target='head', edge_attr='edge_weight', create_using=nx.DiGraph())    
    #shortest path using dijkstra's algorithm
    dij_path=nx.dijkstra_path(G, p1,p2, weight='edge_weight')
    # number of nodes
    dij_nodes= len(dij_path)
    #total cost of the path
    dij_weight=nx.path_weight(G, dij_path, 'edge_weight')
    #weight of each interaction in the path
    dij_edges_weight=[]
    for i in range (dij_nodes -1) :
        x= nx.get_edge_attributes(G, "edge_weight")
        s=x[(dij_path[i], dij_path[i+1])]
        dij_edges_weight.append(s)
    #drawing the subnetwork
        plt.figure(62,figsize=(10,10)) 
    result_graph = G.subgraph(dij_path)
    nx.draw(result_graph,with_labels=True , node_size=1900, width=2)
    plt.savefig('./static/imgs/Dijkstrashortestpath.jpg')
    return 'success'
    
def proteindegrees(df,p):
        #Define dataframe columns
    tail = df['tail']
    head = df['head']
    edge_weight = df['edge_weight']
    edge_type = df['edge_type']

    #Find the most common protein in all PPIs 
    most_common_protein=df.mode()
    if(most_common_protein['tail'][0]==most_common_protein['head'][0]):
        protein = most_common_protein['tail'][0]
    else:
        protein = p

    #Extract the rows where said protein is a tail or head into a new dataframe
    protein_df = df[df.eq(protein).any(axis=1)]
    protein_df=protein_df.iloc[:,:3]

    #Remove the protein name from the dataframe for better readability
    protein_list=protein_df.values.tolist()
    for row in protein_list:
        if(row[0]==protein):
            row.append("Out")
        if(row[1]==protein):
            row.append("In")
        row.remove(protein)
    #Save the list of rows as a dataframe
    modified_protein_df = pd.DataFrame(protein_list)

    #Save the first resulting dataframe into a text file
    np.savetxt(r'./static/imgs/protein_connections.txt', modified_protein_df, fmt='%s')

    #Calculate in and out degrees of the picked protein
    in_degree = len(protein_df.loc[protein_df['head'] == protein])
    out_degree = len(protein_df.loc[protein_df['tail'] == protein])

    #Append the in and out degrees of the protein into the protein_connections.txt file
    with open("./static/imgs/protein_connections.txt", "a") as f:
        f.write("In degree: ")
        f.write(str(in_degree) + "\n")
        f.write("Out degree: ")
        f.write(str(out_degree) + "\n")
    return [in_degree,out_degree]
def UniprotID(p):
        #Convert ONE UniProtID to its coressponding Gene Name
    request_Protein = IdMappingClient.submit(
        #send request to the server to convert the specified protein
        source="UniProtKB_AC-ID", dest="Gene_Name", ids={p})
    time.sleep(7.0)
    return list((request_Protein.each_result()))