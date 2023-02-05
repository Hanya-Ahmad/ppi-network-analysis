# 1. Project Overview
This project uses a protein-protein interaction interactome (PathLinker_2018_human-ppi-weighted-cap0_75.txt)  found [here](https://github.com/Ibrahim-Youssef/localized-pathlinker/tree/master/Data) to perform biological network analysis.
The results of the analysis are then displayed on a web application. All resulting text or csv files are saved in the folder named exportedfiles.

https://user-images.githubusercontent.com/93945902/216844981-e6d1879a-01b0-425b-8aa6-ccdb2c5c022d.mp4


# 2. Project Dependencies
1. NetworkX
2. Pandas
3. Matplotlib
4. Numpy
5. Unipressed
6. Flask

# 3. Project Description
## This analysis consisted of the following
- Constructing the weighted graph of a subset of the interactome (100 samples)
![weightedGraphonly100](https://user-images.githubusercontent.com/93945902/216840713-f749d4fe-268a-40b7-b632-fd51efa07b7f.jpg)
- Listing the highest 100 proteins in degree centrality in a .csv file (Top100DegreeCentralityProteins.csv)
- Finding the shortest unweighted path between two proteins Q8TBF4 and P55157 using Dijkstra's algorithm
![shortestpath-unweighted](https://user-images.githubusercontent.com/93945902/216841061-964dafaf-c59c-4ffd-99b6-7a764554a20a.jpg)
- Finding the shortest weighted path between two proteins Q8TBF4 and P55157 using Dijkstra's algorithm
![shortestpath-weighted](https://user-images.githubusercontent.com/93945902/216841062-ae0dc988-c5dd-4a97-9309-e9a0ff7ed4f9.jpg)
- Visualizing all shortest paths using Dijkstra's algorithm and listing the resulting paths in a .txt file (allpaths.txt)
![allshortestpaths](https://user-images.githubusercontent.com/93945902/216841045-ae0a840e-4e53-4c69-a53b-8c8ea4f1bceb.jpg)
- Listing all directly connected proteins to the protein with highest degree centrality P05067 in a .txt file (protein_connections.txt) where the first column represents the connected protein and the second represents the weight of the interaction. The in and out degrees of the same protein represent the last two rows.
- Ranking a set of proteins according to their in-degree in a descending order and saving the ranked list in a .txt file (sorted_setOfProteins.txt)

- Plotting a histogram of the in-degree of a set of proteins <br>
 ![histogram](https://user-images.githubusercontent.com/93945902/216841059-1a628b90-f523-4d72-95eb-353a0928d47d.jpg)
 
- Mapping a list of UniProt IDs to their corresponding gene names in a .txt file (UniProtIDtoGeneName.txt)
- Constructing the unweighted graph of a subset of the interactome (2500 samples) 
![unweightedGraph](https://user-images.githubusercontent.com/93945902/216841064-ab941005-a6b9-42d1-a83a-93e7ef891765.jpg)
- Saving the adjacency matrix of the unweighted subset in a .txt file (adjacency1.txt)
- Constructing and visualizing the minimum spanning tree using Kruskal's algorithm
![minimumspanningtree](https://user-images.githubusercontent.com/93945902/216841054-30bae031-df04-4d30-9ca5-072b88c4aad2.jpg)

# 4. Results
This analysis proved and visualized the centrality of PPIs around some more influential proteins. It has also shown that the proteins of highest degree centrality play a vital role in achieving physiological functions, which require heavy interactions with other proteins. 
